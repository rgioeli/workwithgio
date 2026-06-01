"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What's the catch?",
    answer: "The website build itself is free for selected businesses. You only cover the Website Maintenance Plan ($25/month) and Domain Registration (typically $10-$20/year). In exchange, I ask for a testimonial and permission to showcase the project in my portfolio.",
  },
  {
    question: "Is this really worth $1,500+?",
    answer: "A professionally built business website can easily cost $1,500 or more depending on the design, pages, features, content, forms, setup, and launch process. For this giveaway, selected businesses do not pay the upfront website build cost.",
  },
  {
    question: "Why only $25/month?",
    answer: "The $25/month Website Maintenance Plan keeps the site hosted, monitored, technically managed, and supported. I'm keeping it affordable because this giveaway is designed to help local businesses while helping Built By Gio build more case studies and testimonials.",
  },
  {
    question: "Am I locked into a long contract?",
    answer: "No. There are no long-term contracts. The Website Maintenance Plan can be canceled at any time.",
  },
  {
    question: "Will I be pressured into buying anything?",
    answer: "No. If I notice opportunities that could help your business, I may point them out, but there is no obligation to purchase anything else. Website Updates, Marketing & Branding, and Lead Generation & Automation are completely optional upgrades.",
  },
  {
    question: "How do I reserve my spot?",
    answer: "If your business is approved, you'll receive a secure link to activate your Website Maintenance Plan ($25/month) and reserve your spot. Once reserved, I'll begin building your website.",
  },
  {
    question: "Why are you doing this?",
    answer: "I'm growing Built By Gio and selecting 5 local businesses to build additional case studies, testimonials, and portfolio examples. Instead of charging the normal upfront website build fee, I'm offering the website build for free to selected businesses.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-muted/50 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Common questions about the free website program.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
