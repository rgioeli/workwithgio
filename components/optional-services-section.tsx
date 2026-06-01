"use client"

import { motion } from "framer-motion"
import { Check, ChevronDown, Sparkles } from "lucide-react"
import { useState } from "react"
import {
  servicePlans,
  getIncludedPlanNames,
} from "@/lib/validations/giveaway-application"

export function OptionalServicesSection() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

  // Filter out Website Maintenance Plan - only show optional upgrade plans
  const optionalPlans = servicePlans.filter((plan) => plan.id !== "foundation")

  const colorClasses: Record<string, string> = {
    green: "border-green-500",
    blue: "border-blue-500",
    gold: "border-yellow-500",
  }

  const bgColorClasses: Record<string, string> = {
    green: "bg-green-500/5",
    blue: "bg-blue-500/5",
    gold: "bg-yellow-500/5",
  }

  const accentColorClasses: Record<string, string> = {
    green: "text-green-500",
    blue: "text-blue-500",
    gold: "text-yellow-500",
  }

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Looking For More Than Just A Website?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
            Many businesses start with a free website and later choose additional services to help them stay active online, build trust, and generate more opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {optionalPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl border-2 p-6 bg-card transition-all hover:shadow-lg ${
                colorClasses[plan.color] || "border-border"
              } ${bgColorClasses[plan.color] || ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" /> MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <span className="text-3xl mb-2 block">{plan.icon}</span>
                <h3 className="font-bold text-xl">{plan.name}</h3>
              </div>

              <div className="text-center mb-4">
                <span className={`text-3xl font-bold ${accentColorClasses[plan.color] || "text-foreground"}`}>
                  +${plan.additionalPrice}
                </span>
                <span className="text-muted-foreground">/month</span>
                <p className="text-sm text-muted-foreground mt-1">
                  (${plan.price}/month total)
                </p>
              </div>

              <p className="text-sm text-muted-foreground text-center mb-4">
                {plan.description}
              </p>

              {plan.includesPrevious && (
                <div className="mb-4 p-2 bg-muted/50 rounded-lg border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-1 text-center">
                    Everything included in:
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {getIncludedPlanNames(plan.id).map((name, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-background px-2 py-0.5 rounded border border-border"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-2 text-sm">
                {(expandedPlan === plan.id
                  ? plan.features
                  : plan.features.slice(0, 4)
                ).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.features.length > 4 && (
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPlan(
                          expandedPlan === plan.id ? null : plan.id
                        )
                      }
                      className="text-primary text-xs flex items-center gap-1 hover:underline mx-auto"
                    >
                      {expandedPlan === plan.id ? (
                        <>
                          Show less{" "}
                          <ChevronDown className="w-3 h-3 rotate-180" />
                        </>
                      ) : (
                        <>
                          +{plan.features.length - 4} more features{" "}
                          <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-muted-foreground text-sm mt-10 max-w-3xl mx-auto"
        >
          These services are completely optional. Every business accepted into the program receives a professionally built website through the Website Maintenance Plan. Additional services are available for businesses looking to further grow their online presence.
        </motion.p>
      </div>
    </section>
  )
}
