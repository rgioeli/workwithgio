"use client"

import { motion } from "framer-motion"
import { Check, Globe, Shield, Smartphone, Mail, LayoutList } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Professional Website",
    description: "A modern, custom-designed website that represents your business professionally online.",
  },
  {
    icon: Shield,
    title: "Hosting & Maintenance",
    description: "Reliable hosting with ongoing maintenance to keep your site running smoothly.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly Design",
    description: "Your site looks great and works perfectly on phones, tablets, and desktops.",
  },
  {
    icon: Mail,
    title: "Contact Form",
    description: "Let customers reach you directly through a professional contact form.",
  },
  {
    icon: Shield,
    title: "Security & Reliability",
    description: "SSL certificate, regular backups, and monitoring to keep your site secure.",
  },
  {
    icon: LayoutList,
    title: "Menu, Products, or Services Section",
    description: "A dedicated section showcasing what your business offers, tailored to your industry.",
  },
]

export function FoundationPlanSection() {
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
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Website Maintenance Plan - $25/month
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {"What's Included in Your Website"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            The Website Maintenance Plan keeps your website online, secure, updated, and maintained. Every selected business receives a complete, professional website.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-sm">
              <span className="font-semibold">All of this included</span>
              <span className="text-muted-foreground"> for just $25/month</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
