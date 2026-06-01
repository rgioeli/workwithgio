"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Home,
  Sparkles,
  ChevronDown,
  Zap,
  ShieldCheck,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clientFormSchema,
  formatPhoneNumber,
  getPhoneDigits,
  transformFormDataForApi,
  businessTypes,
  businessChallenges,
  websiteGoals,
  servicePlans,
  addOnServices,
  calculateMonthlyTotal,
  getIncludedPlanNames,
  type ClientFormData,
  type PlanId,
} from "@/lib/validations/giveaway-application";
import { trackMetaEvent, trackMetaLead } from "@/lib/facebook/trackMetaEvent";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

const steps = [
  { number: 1, title: "Business Type" },
  { number: 2, title: "Challenges" },
  { number: 3, title: "Goals" },
  { number: 4, title: "Plan" },
  { number: 5, title: "Add-Ons" },
  { number: 6, title: "Contact" },
  { number: 7, title: "Review" },
];

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeaderRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const continueButtonRef = useRef<HTMLDivElement>(null);
  const shouldScrollAfterStepChange = useRef(false);

  const hasStartedApplication = useRef(false);

  const markApplicationStarted = () => {
    if (!hasStartedApplication.current) {
      hasStartedApplication.current = true;
      trackMetaEvent("ApplicationStarted");
    }
  };

  const stepNames = [
    "Business Type",
    "Challenges",
    "Goals",
    "Plan Selection",
    "Optional Add Ons",
    "Contact Information",
    "Review",
  ];

  useEffect(() => {
    if (!isFormVisible) return;

    trackMetaEvent("ApplicationStepViewed", {
      step_index: currentStep,
      step_name: stepNames[currentStep - 1],
    });
  }, [currentStep, isFormVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
    setFocus,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    mode: "onChange",
    defaultValues: {
      businessType: "",
      businessTypeOther: "",
      biggestChallenge: "",
      biggestChallengeOther: "",
      websiteGoal: "",
      selectedPlan: "foundation",
      selectedAddOns: [],
      fullName: "",
      businessName: "",
      email: "",
      phoneRaw: "",
      phoneFormatted: "",
      currentWebsiteUrl: "",
      termsAccepted: false as unknown as true,
      websiteConfirm: "",
    },
  });

  const selectedBusinessType = watch("businessType");
  const selectedChallenge = watch("biggestChallenge");
  const selectedGoal = watch("websiteGoal");
  const selectedPlan = watch("selectedPlan");
  const selectedAddOns = watch("selectedAddOns") || [];
  const termsAccepted = watch("termsAccepted");

  // Scroll to step header after step changes (uses requestAnimationFrame for reliable timing)
  useEffect(() => {
    if (!shouldScrollAfterStepChange.current) return;

    shouldScrollAfterStepChange.current = false;

    requestAnimationFrame(() => {
      stepHeaderRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [currentStep]);

  // Scroll to success message when submitted
  useEffect(() => {
    if (!isSubmitted) return;

    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [isSubmitted]);

  // Track form visibility for mobile sticky nav
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const validateStep = async (step: number): Promise<boolean> => {
    let fields: (keyof ClientFormData)[] = [];

    switch (step) {
      case 1:
        fields = ["businessType"];
        break;
      case 2:
        fields = ["biggestChallenge"];
        break;
      case 3:
        fields = ["websiteGoal"];
        break;
      case 4:
        fields = ["selectedPlan"];
        break;
      case 5:
        return true; // Add-ons are optional
      case 6:
        fields = ["fullName", "businessName", "email", "phoneRaw"];
        break;
      default:
        return true;
    }

    const isValid = await trigger(fields);
    return isValid;
  };

  const nextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 7) {
      shouldScrollAfterStepChange.current = true;
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      shouldScrollAfterStepChange.current = true;
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = getPhoneDigits(e.target.value);
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneDisplay(formatted);
    setValue("phoneRaw", rawDigits, { shouldValidate: true });
    setValue("phoneFormatted", formatted);
  };

  const handleOptionSelect = (
    field: keyof ClientFormData,
    value: string,
    autoAdvance: boolean = false,
  ) => {
    setValue(field, value as never, { shouldValidate: true });
    // Auto-advance for steps 1-3 (Business Type, Challenges, Goals)
    if (autoAdvance && currentStep < 4) {
      setTimeout(() => {
        shouldScrollAfterStepChange.current = true;
        setCurrentStep((prev) => prev + 1);
      }, 300); // Small delay for visual feedback
    }
  };

  const handlePlanSelect = (planId: PlanId) => {
    setValue("selectedPlan", planId, { shouldValidate: true });
    // On mobile, scroll to Continue button after plan selection
    setTimeout(() => {
      continueButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  };

  const handleAddOnToggle = (addOnId: string) => {
    const current = selectedAddOns || [];
    const updated = current.includes(addOnId)
      ? current.filter((id) => id !== addOnId)
      : [...current, addOnId];
    setValue("selectedAddOns", updated);
  };

  const onSubmit = async (data: ClientFormData) => {
    if (currentStep !== 7) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const apiData = transformFormDataForApi(data);

      const response = await fetch("/api/giveaway/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      trackMetaEvent("ApplicationSubmitted", {
        selected_plan: data.selectedPlan,
        add_ons_count: data.selectedAddOns?.length || 0,
      });

      trackMetaLead({
        selected_plan: data.selectedPlan,
        add_ons_count: data.selectedAddOns?.length || 0,
      });

      setIsSubmitted(true);
    } catch (error) {
      trackMetaEvent("ApplicationSubmitFailed", {
        step_index: currentStep,
        step_name: stepNames[currentStep - 1],
        selected_plan: data.selectedPlan,
      });
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your application. Please try again or message me directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthlyTotal = calculateMonthlyTotal(selectedPlan);
  const currentPlan = servicePlans.find((p) => p.id === selectedPlan);

  // Success screen
  if (isSubmitted) {
    return (
      <motion.div
        ref={successRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Application Received</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          {
            "Thank you for applying. I'll review your business personally and reach out if I believe it's a good fit for the program."
          }
        </p>
        <div className="bg-card border border-border rounded-lg p-4 max-w-sm mx-auto mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            Your selected plan:
          </p>
          <p className="font-semibold text-lg">
            {currentPlan?.icon} {currentPlan?.name}
          </p>
          <p className="text-primary font-bold">${monthlyTotal}/month</p>
        </div>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <Card ref={cardRef} className="border-border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">Business Growth Assessment</CardTitle>
        <CardDescription>
          Answer a few questions to help us understand your business needs.
        </CardDescription>

        {/* Important Notice */}
        {/* <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Important:</span> The Website Maintenance Plan ($25/month) is the required plan included with every free website. Additional services such as Website Updates, Marketing & Branding, and Lead Generation & Automation are completely optional.
          </p>
        </div> */}

        {/* Progress Bar */}
        <div ref={stepHeaderRef} className="mt-6 scroll-mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              Step {currentStep} of {steps.length}
            </span>
            <span>
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`text-xs hidden sm:block ${
                  currentStep >= step.number
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          {/* Honeypot field */}
          <input
            type="text"
            {...register("websiteConfirm")}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              opacity: 0,
              height: 0,
              width: 0,
              pointerEvents: "none",
            }}
          />

          <AnimatePresence mode="wait">
            {/* Step 1: Business Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    What type of business do you own?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Select the option that best describes your business.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {businessTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        markApplicationStarted();
                        trackMetaEvent("BusinessTypeSelected", {
                          businessType: type.value,
                        });
                        handleOptionSelect(
                          "businessType",
                          type.value,
                          type.value !== "other",
                        );
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedBusinessType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <span className="font-medium text-sm">{type.label}</span>
                    </motion.button>
                  ))}
                </div>

                {selectedBusinessType === "other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="businessTypeOther">
                      Please specify your business type
                    </Label>
                    <Input
                      id="businessTypeOther"
                      placeholder="e.g., Event Planning, Photography"
                      {...register("businessTypeOther")}
                    />
                  </motion.div>
                )}

                {errors.businessType && (
                  <p className="text-sm text-destructive text-center">
                    {errors.businessType.message}
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 2: Biggest Challenge */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    What is your biggest challenge right now?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    This helps us understand how we can best help you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {businessChallenges.map((challenge) => (
                    <motion.button
                      key={challenge.value}
                      type="button"
                      onClick={() => {
                        trackMetaEvent("ChallengeSelected", {
                          biggestChallenge: challenge.value,
                        });
                        handleOptionSelect(
                          "biggestChallenge",
                          challenge.value,
                          challenge.value !== "other",
                        );
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                        selectedChallenge === challenge.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl">{challenge.icon}</span>
                      <span className="font-medium text-sm">
                        {challenge.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {selectedChallenge === "other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="biggestChallengeOther">
                      Please describe your challenge
                    </Label>
                    <Input
                      id="biggestChallengeOther"
                      placeholder="Tell us about your biggest challenge"
                      {...register("biggestChallengeOther")}
                    />
                  </motion.div>
                )}

                {errors.biggestChallenge && (
                  <p className="text-sm text-destructive text-center">
                    {errors.biggestChallenge.message}
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 3: Website Goals */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    What would you like your website to help you accomplish?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Select the primary goal for your new website.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {websiteGoals.map((goal) => (
                    <motion.button
                      key={goal.value}
                      type="button"
                      onClick={() => {
                        trackMetaEvent("WebsiteGoalSelected", {
                          websiteGoal: goal.value,
                        });
                        handleOptionSelect("websiteGoal", goal.value, true);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedGoal === goal.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl mb-2 block">{goal.icon}</span>
                      <span className="font-medium text-sm">{goal.label}</span>
                    </motion.button>
                  ))}
                </div>

                {errors.websiteGoal && (
                  <p className="text-sm text-destructive text-center">
                    {errors.websiteGoal.message}
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 4: Choose Plan */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 -mt-5">
                    Choose Your Website Plan
                  </h3>
                  <p className="text-muted-foreground text-xs mt-2 max-w-md mx-auto">
                    Every option includes the $25/month Website Maintenance
                    Plan.
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 max-w-md mx-auto">
                    Stay with the basic plan, or choose an upgrade for extra
                    help.
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 max-w-md mx-auto">
                    Then tap{" "}
                    <span className="font-bold text-primary">Continue</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {servicePlans.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const colorClasses = {
                      red: "border-primary",
                      green: "border-green-500",
                      blue: "border-blue-500",
                      gold: "border-yellow-500",
                    };
                    const bgColorClasses = {
                      red: "bg-primary/5",
                      green: "bg-green-500/5",
                      blue: "bg-blue-500/5",
                      gold: "bg-yellow-500/5",
                    };
                    const buttonColorClasses = {
                      red: "bg-primary hover:bg-primary/90",
                      green: "bg-green-500 hover:bg-green-600",
                      blue: "bg-blue-500 hover:bg-blue-600",
                      gold: "bg-yellow-500 hover:bg-yellow-600 text-black",
                    };

                    return (
                      <motion.div
                        key={plan.id}
                        onClick={() => {
                          trackMetaEvent("PlanSelected", { plan: plan.id });
                          handlePlanSelect(plan.id);
                        }}
                        aria-pressed={isSelected}
                        className={`relative rounded-xl border-2 p-5 transition-all text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          isSelected
                            ? `${colorClasses[plan.color]} ${bgColorClasses[plan.color]}`
                            : "border-border hover:border-muted-foreground/50"
                        } ${plan.popular ? "mt-3" : ""}`}
                        animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
                      >
                        {/* Selected Checkmark */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}

                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> MOST POPULAR
                            </span>
                          </div>
                        )}

                        <div className="flex mb-3">
                          <div className="flex flex-col">
                            <div className="flex">
                              <span className="text-2xl mr-2">{plan.icon}</span>
                              <span className="font-bold text-lg">
                                {plan.name}
                              </span>
                            </div>
                            {plan.isRequired && (
                              <Badge
                                variant="outline"
                                className="border border-primary bg-primary/75"
                              >
                                <span className="text-xs flex items-center gap-1 px-2 py-0.5 rounded text-white">
                                  <Zap className="w-3 h-3" /> Featured Promotion
                                </span>
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mb-3">
                          {plan.additionalPrice ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs flex items-center gap-1 border border-green-500 bg-green-500/10 text-green-500 rounded-md p-2 mb-1">
                                <ShieldCheck className="w-5 h-5 text-green-500" />{" "}
                                Includes the $25/month Website Maintenance Plan
                                Promotion.
                              </span>

                              {plan.additionalPrice && (
                                <div className="my-1">
                                  <div className="flex items-baseline gap-1">
                                    <span className="flex items-center gap-1">
                                      <span className="text-2xl font-bold">
                                        +${plan.additionalPrice}
                                      </span>
                                    </span>
                                    <span className="text-muted-foreground">
                                      /month
                                    </span>
                                  </div>

                                  <p className="text-sm flex items-center gap-1 text-muted-foreground">
                                    ${plan.price}/month total
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <span className="text-2xl font-bold">
                                ${plan.price}
                              </span>
                              <span className="text-muted-foreground">
                                /month
                              </span>
                            </div>
                          )}
                        </div>

                        {plan.includesPrevious && (
                          <div className="mb-3 p-2 bg-muted/50 rounded-lg border border-border">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Everything included in:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {getIncludedPlanNames(plan.id).map(
                                (name, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-background px-2 py-0.5 rounded border border-border"
                                  >
                                    {name}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        <ul className="space-y-1.5 mb-4 text-sm">
                          {/* Show 3 features on mobile, 4 on desktop when not expanded */}
                          {(expandedPlan === plan.id
                            ? plan.features
                            : plan.features.slice(
                                0,
                                typeof window !== "undefined" &&
                                  window.innerWidth < 768
                                  ? 3
                                  : 4,
                              )
                          ).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedPlan(
                                    expandedPlan === plan.id ? null : plan.id,
                                  );
                                }}
                                className="text-primary text-xs flex items-center gap-1 hover:underline"
                              >
                                {expandedPlan === plan.id ? (
                                  <>
                                    Show less{" "}
                                    <ChevronDown className="w-3 h-3 rotate-180" />
                                  </>
                                ) : (
                                  <>
                                    +{plan.features.length - 3} more features{" "}
                                    <ChevronDown className="w-3 h-3" />
                                  </>
                                )}
                              </button>
                            </li>
                          )}
                        </ul>

                        <p className="text-xs text-muted-foreground mb-4">
                          {plan.description}
                        </p>

                        {/* Selection indicator */}
                        <div
                          className={`w-full py-3 px-4 rounded-lg text-center font-medium text-sm transition-colors ${
                            isSelected
                              ? `${buttonColorClasses[plan.color]} text-white`
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {plan.isRequired
                            ? isSelected
                              ? "Selected"
                              : "Tap to Select"
                            : isSelected
                              ? "Selected"
                              : "Tap to Select"}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 5: Add-Ons */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    Optional Add-Ons
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Select any additional services you&apos;re interested in.
                    We&apos;ll discuss pricing if your application is approved.
                  </p>
                </div>

                <div className="space-y-3">
                  {addOnServices.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn.id);
                    return (
                      <motion.button
                        key={addOn.id}
                        type="button"
                        onClick={() => {
                          const isCurrentlySelected = selectedAddOns.includes(
                            addOn.id,
                          );

                          trackMetaEvent("AddOnToggled", {
                            add_on_id: addOn.id,
                            add_on_label: addOn.label,
                            selected: !isCurrentlySelected,
                          });

                          handleAddOnToggle(addOn.id);
                        }}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="font-medium">{addOn.label}</span>
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  These are optional. You can skip this step if you&apos;re not
                  interested.
                </p>
              </motion.div>
            )}

            {/* Step 6: Contact Info */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    Contact Information
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    How can we reach you about your application?
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Smith"
                      {...register("fullName")}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Smith's Plumbing"
                      {...register("businessName")}
                      className={
                        errors.businessName ? "border-destructive" : ""
                      }
                    />
                    {errors.businessName && (
                      <p className="text-sm text-destructive">
                        {errors.businessName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@smithplumbing.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(765) 555-1234"
                      value={phoneDisplay}
                      onChange={handlePhoneChange}
                      className={errors.phoneRaw ? "border-destructive" : ""}
                    />
                    {errors.phoneRaw && (
                      <p className="text-sm text-destructive">
                        {errors.phoneRaw.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentWebsiteUrl">
                    Current Website URL (optional)
                  </Label>
                  <Input
                    id="currentWebsiteUrl"
                    placeholder="example.com or https://www.example.com"
                    {...register("currentWebsiteUrl")}
                    className={
                      errors.currentWebsiteUrl ? "border-destructive" : ""
                    }
                  />
                  {errors.currentWebsiteUrl && (
                    <p className="text-sm text-destructive">
                      {errors.currentWebsiteUrl.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Leave blank if you don&apos;t have a website
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 7: Review */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    Review Your Application
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Please review your selections before submitting.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {/* Selected Plan */}
                  <div className="p-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">
                      Selected Plan
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">
                        {currentPlan?.icon} {currentPlan?.name}
                      </span>
                      <span className="font-bold text-primary">
                        ${monthlyTotal}/mo
                      </span>
                    </div>
                  </div>

                  {/* Add-Ons */}
                  {selectedAddOns.length > 0 && (
                    <div className="p-4 border-b border-border bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">
                        Interested In
                      </p>
                      <ul className="space-y-1">
                        {selectedAddOns.map((id) => {
                          const addOn = addOnServices.find((a) => a.id === id);
                          return (
                            <li
                              key={id}
                              className="text-sm flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 text-green-500" />
                              {addOn?.label}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="p-4 bg-foreground text-background">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="opacity-70">
                          Website Maintenance Plan (Required):
                        </span>
                        <span>$25/mo</span>
                      </div>
                      {selectedPlan !== "foundation" && (
                        <div className="flex justify-between text-sm">
                          <span className="opacity-70">
                            {currentPlan?.name} Upgrade:
                          </span>
                          <span>+${currentPlan?.additionalPrice || 0}/mo</span>
                        </div>
                      )}
                      <div className="border-t border-background/20 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Monthly Investment:</span>
                          <span className="text-primary">
                            ${monthlyTotal}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Summary */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Contact Information
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">
                        {getValues("fullName") || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Business:</span>
                      <p className="font-medium">
                        {getValues("businessName") || "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{getValues("email") || "—"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{phoneDisplay || "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Terms Acknowledgment */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="termsAccepted"
                      checked={termsAccepted === true}
                      onCheckedChange={(checked) => {
                        trackMetaEvent("TermsAccepted", {
                          termsAccepted: checked,
                          selected_plan: selectedPlan,
                        });
                        setValue(
                          "termsAccepted",
                          checked === true ? true : (false as never),
                          { shouldValidate: true },
                        );
                      }}
                    />
                    <Label
                      htmlFor="termsAccepted"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I understand that the website build is free for selected
                      businesses, but the ${monthlyTotal}/month{" "}
                      {currentPlan?.name} Plan and domain registration are
                      required.
                    </Label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-sm text-destructive mt-2">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                    <div className="text-destructive">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-destructive">{submitError}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons - Desktop */}
          <div
            ref={continueButtonRef}
            className="hidden md:flex justify-between mt-8 pt-6 border-t border-border"
          >
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 7 ? (
              <Button type="button" onClick={nextStep} className="gap-2">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !termsAccepted}
                className="gap-2 min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit My Application"
                )}
              </Button>
            )}
          </div>

          {/* Mobile Bottom Padding for Sticky Nav */}
          <div className="h-24 md:hidden" />
        </form>

        {/* Mobile Sticky Navigation - only show when form is in viewport */}
        {isFormVisible && (
          <div
            className={`fixed bottom-0 left-0 right-0 p-4 backdrop-blur-sm border-t md:hidden z-50 transition-colors ${
              currentStep === 4 && selectedPlan
                ? "bg-primary/10 border-primary/30"
                : "bg-background/95 border-border"
            }`}
          >
            <div className="flex gap-3 max-w-4xl mx-auto">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Back</span>
                </Button>
              )}

              {currentStep < 7 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className={`flex-1 py-6 text-base font-semibold transition-all ${
                    currentStep === 4 && selectedPlan
                      ? "animate-pulse ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    formRef.current?.requestSubmit();
                  }}
                  disabled={isSubmitting || !termsAccepted}
                  className="flex-1 py-6 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit My Application"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
