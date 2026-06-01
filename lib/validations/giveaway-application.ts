import { z } from "zod"

// Phone number utilities
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10)
}

// URL normalization
export function normalizeUrl(url: string): string {
  if (!url || url.trim() === "") return ""
  let normalized = url.trim()
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`
  }
  return normalized
}

// Business type options
export const businessTypes = [
  { value: "contractor", label: "Contractor", icon: "🔧" },
  { value: "restaurant", label: "Restaurant", icon: "🍽️" },
  { value: "retail", label: "Retail Store", icon: "🏪" },
  { value: "professional", label: "Professional Service", icon: "💼" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "other", label: "Other", icon: "📋" },
] as const

// Biggest challenge options
export const businessChallenges = [
  { value: "not_enough_leads", label: "Not enough leads", icon: "📉" },
  { value: "not_enough_calls", label: "Not enough phone calls", icon: "📞" },
  { value: "outdated_website", label: "Outdated website", icon: "🖥️" },
  { value: "not_showing_online", label: "Not showing up online", icon: "🔍" },
  { value: "following_up", label: "Following up with customers", icon: "📧" },
  { value: "growing_business", label: "Growing my business", icon: "📈" },
  { value: "other", label: "Other", icon: "💭" },
] as const

// Website goals options
export const websiteGoals = [
  { value: "generate_leads", label: "Generate more leads", icon: "🎯" },
  { value: "build_trust", label: "Build trust", icon: "🤝" },
  { value: "more_calls", label: "Get more phone calls", icon: "📱" },
  { value: "book_appointments", label: "Book appointments", icon: "📅" },
  { value: "showcase_work", label: "Showcase my work", icon: "🖼️" },
  { value: "all_of_above", label: "All of the above", icon: "✨" },
] as const

// Service plans
export const servicePlans = [
  {
    id: "foundation",
    name: "Website Maintenance Plan",
    shortName: "Website Maintenance",
    price: 25,
    isRequired: true,
    icon: "🌐",
    color: "red",
    description: "The Website Maintenance Plan keeps your website online, secure, updated, and maintained for just $25/month.",
    features: [
      "Professional Website",
      "Menu, Product, or Services Section (based on your business)",
      "Hosting & Maintenance",
      "Mobile-Friendly Design",
      "Contact Form",
      "Security & Reliability"
    ],
  },
  {
    id: "grow",
    name: "Website Updates",
    price: 50,
    additionalPrice: 25,
    icon: "🌱",
    color: "green",
    description: "Perfect for businesses that want their website kept current and professional.",
    features: [
      "Website Updates",
      "Photo & Text Changes",
      "Ability to Add Promotional Sections",
      "Service & Pricing Updates",
      "Portfolio & Project Updates",
      "Google Business Profile Assistance",
      "Priority Support",
    ],
    includesPrevious: true,
  },
  {
    id: "scale",
    name: "Marketing & Branding",
    price: 149,
    additionalPrice: 124,
    icon: "📈",
    color: "blue",
    popular: true,
    description: "Perfect for businesses that want ongoing marketing support without hiring a full-time marketer.",
    features: [
      "Social Media Content Creation",
      "Social Media Posting Done For You",
      "Promotional Graphics",
      "Business Card Designs",
      "T-Shirt Graphics",
      "Yard Sign Designs",
      "Flyer Designs",
      "Hiring Graphics",
      "Review Showcase Graphics",
      "Marketing Material Designs",
    ],
    includesPrevious: true,
  },
  {
    id: "growth_engine",
    name: "Lead Generation & Automation",
    price: 297,
    additionalPrice: 272,
    icon: "🚀",
    color: "gold",
    description: "Perfect for businesses focused on generating and converting more customers online.",
    features: [
      "Instant Lead Notifications",
      "Automated Lead Follow-Up",
      "Online Appointment Booking",
      "Google Review System",
      "Lead Tracking Dashboard",
      "Monthly Growth Consultation",
    ],
    includesPrevious: true,
  },
] as const

// Add-on services
export const addOnServices = [
  { id: "facebook_ads", label: "Facebook Ads Management", price: null },
  { id: "google_ads", label: "Google Ads Management", price: null },
  { id: "seo", label: "SEO Services", price: null },
  { id: "promo_video", label: "Business Promo Video", price: null },
  { id: "photo_capture", label: "Business Photo Capture", price: null },
] as const

// Plan types
export type PlanId = typeof servicePlans[number]["id"]
export type AddOnId = typeof addOnServices[number]["id"]

// Shared validation schema for client and server
export const giveawayApplicationSchema = z.object({
  // Step 1: Business Type
  businessType: z.string().min(1, "Please select your business type"),
  businessTypeOther: z.string().optional(),

  // Step 2: Biggest Challenge
  biggestChallenge: z.string().min(1, "Please select your biggest challenge"),
  biggestChallengeOther: z.string().optional(),

  // Step 3: Website Goals
  websiteGoal: z.string().min(1, "Please select what you want your website to accomplish"),

  // Step 4: Selected Plan
  selectedPlan: z.enum(["foundation", "grow", "scale", "growth_engine"]),

  // Step 5: Add-ons
  selectedAddOns: z.array(z.string()).optional(),

  // Step 6: Contact Info
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .transform((val) => val.trim()),
  businessName: z
    .string()
    .min(1, "Business name is required")
    .min(2, "Business name must be at least 2 characters")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((val) => val.trim().toLowerCase()),
  phoneRaw: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  phoneFormatted: z.string().optional(),
  currentWebsiteUrl: z
    .string()
    .optional()
    .transform((val) => (val ? normalizeUrl(val) : ""))
    .refine(
      (val) => {
        if (!val || val === "") return true
        try {
          new URL(val)
          return true
        } catch {
          return false
        }
      },
      { message: "Please enter a valid URL" }
    ),

  // Step 7: Acknowledgment
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message:
        "You must acknowledge the terms to submit your application",
    }),
  }),

  // Honeypot field - should always be empty
  websiteConfirm: z.string().max(0, "Invalid submission").optional(),
})

export type GiveawayApplicationData = z.infer<typeof giveawayApplicationSchema>

// Client-side form schema (for react-hook-form)
export const clientFormSchema = z.object({
  businessType: z.string().min(1, "Please select your business type"),
  businessTypeOther: z.string().optional(),
  biggestChallenge: z.string().min(1, "Please select your biggest challenge"),
  biggestChallengeOther: z.string().optional(),
  websiteGoal: z.string().min(1, "Please select what you want your website to accomplish"),
  selectedPlan: z.enum(["foundation", "grow", "scale", "growth_engine"]),
  selectedAddOns: z.array(z.string()).optional(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneRaw: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  phoneFormatted: z.string().optional(),
  currentWebsiteUrl: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: "You must acknowledge the terms to submit",
    }),
  }),
  websiteConfirm: z.string().optional(),
})

export type ClientFormData = z.infer<typeof clientFormSchema>

// Transform client form data to API format
export function transformFormDataForApi(data: ClientFormData): GiveawayApplicationData {
  return {
    businessType: data.businessType,
    businessTypeOther: data.businessTypeOther,
    biggestChallenge: data.biggestChallenge,
    biggestChallengeOther: data.biggestChallengeOther,
    websiteGoal: data.websiteGoal,
    selectedPlan: data.selectedPlan,
    selectedAddOns: data.selectedAddOns || [],
    fullName: data.fullName.trim(),
    businessName: data.businessName.trim(),
    email: data.email.trim().toLowerCase(),
    phoneRaw: data.phoneRaw,
    phoneFormatted: data.phoneFormatted,
    currentWebsiteUrl: data.currentWebsiteUrl ? normalizeUrl(data.currentWebsiteUrl) : "",
    termsAccepted: data.termsAccepted,
    websiteConfirm: data.websiteConfirm,
  }
}

// Calculate monthly total based on selected plan
export function calculateMonthlyTotal(planId: PlanId): number {
  const plan = servicePlans.find(p => p.id === planId)
  return plan?.price || 25
}

// Get plan display info
export function getPlanInfo(planId: PlanId) {
  return servicePlans.find(p => p.id === planId)
}

// Get previous plan names for a plan (plans that are included)
export function getIncludedPlanNames(planId: PlanId): string[] {
  const planOrder = ["foundation", "grow", "scale", "growth_engine"]
  const currentIndex = planOrder.indexOf(planId)
  if (currentIndex <= 0) return []

  return planOrder
    .slice(0, currentIndex)
    .map(id => servicePlans.find(p => p.id === id)?.name || id)
}
