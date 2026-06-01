"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export function ScarcitySection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Website Giveaway Status</h3>
                <p className="text-2xl font-bold text-foreground">
                  5 Businesses Will Be Selected
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Applications are now open. Selected businesses will be updated as spots are filled.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
