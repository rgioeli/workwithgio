"use client"

import { motion } from "framer-motion"
import { Check, Globe, Monitor, Clock, Wrench } from "lucide-react"

export function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why This Is Such A Strong Offer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            A professional website is usually a serious investment. For this giveaway, I&apos;m removing the upfront build cost for 5 selected local businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Left Card - Typical Website Project */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-bold mb-6 text-foreground">
              Typical Website Project
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Monitor className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Custom website build</p>
                  <p className="text-muted-foreground">$1,500+</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Monthly website management</p>
                  <p className="text-muted-foreground">Often $75–$200+/month</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Domain registration</p>
                  <p className="text-muted-foreground">Usually $10–$20/year</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Timeline</p>
                  <p className="text-muted-foreground">Varies by project</p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
              Pricing varies by agency, scope, pages, features, and ongoing support.
            </p>
          </motion.div>

          {/* Right Card - Built By Gio Giveaway */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border-2 border-primary rounded-xl p-6 shadow-sm relative"
          >
            <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              This Giveaway
            </div>
            
            <h3 className="text-xl font-bold mb-6 text-foreground">
              Built By Gio Giveaway
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Website build</p>
                  <p className="text-primary font-semibold">$0 for selected businesses</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Website Maintenance Plan</p>
                  <p className="text-primary font-semibold">$25/month</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Domain registration</p>
                  <p className="text-muted-foreground">Typically $10–$20/year</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Includes</p>
                  <p className="text-muted-foreground">Modern, mobile-friendly website</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-primary/20 bg-primary/5 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl">
              <p className="text-sm font-medium text-foreground">
                You save the upfront build cost in exchange for an honest testimonial and permission to showcase the project.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
