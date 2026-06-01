"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { forwardRef } from "react"

interface HeroSectionProps {
  onApplyClick: () => void
  applyButtonRef?: React.RefObject<HTMLButtonElement | null>
}

export const HeroSection = forwardRef<HTMLButtonElement, HeroSectionProps>(
  function HeroSection({ onApplyClick, applyButtonRef }, ref) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-4iEoYQcmcTGol0zmtdhvTAPbfdcrYn.png"
                alt="Built By Gio - Web Development"
                width={180}
                height={90}
                className="h-auto w-auto max-h-20"
                priority
              />
            </div>

            <Badge variant="secondary" className="text-sm font-medium">
              Limited Opportunity
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Free Website Giveaway For{" "}
              <span className="text-primary">5 Local Businesses</span>
            </h1>

            <div className="text-lg text-muted-foreground leading-relaxed max-w-xl space-y-4">
              <p className="text-pretty">
                {"I'm looking for 5 local businesses that need a better online presence. I'll build you a modern website for free."}
              </p>
              <div className="space-y-2">
                <p className="font-medium text-foreground">You only pay:</p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">&#10003;</span>
                    Website Maintenance Plan ($25/month)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">&#10003;</span>
                    Domain Registration (typically $10-$20/year)
                  </li>
                </ul>
              </div>
              <p className="text-sm">
                In exchange, I ask for a testimonial and permission to showcase the project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                ref={applyButtonRef || ref}
                size="lg"
                onClick={onApplyClick}
                className="text-lg px-8 py-6 font-semibold"
              >
                Apply Now
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="bg-card border-l-4 border-primary rounded-lg p-5 shadow-sm max-w-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Website Build Value:</span>
                  <p className="font-bold text-2xl text-primary">$1,500+</p>
                </div>
                <div className="border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">Selected Businesses Pay:</span>
                  <p className="font-semibold text-foreground">$25/month Website Maintenance Plan</p>
                  <p className="text-sm text-muted-foreground">+ Domain Registration</p>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                  No large upfront website build fee for selected businesses.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Founder Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative shadow-lg aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Decorative border */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary rounded-2xl" />

              {/* Main image container */}
              <div className="relative w-full h-full bg-muted rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://pntf8qhv3c.ufs.sh/f/lSxmmLKPJplSBPZCJPnSOLMewzPbD26VqgnJmNvfYA0yj94I"
                  alt="Rob Gioeli, Founder of Built By Gio"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Founder callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute -bottom-6 left-4 bg-card border border-border rounded-xl px-5 py-3 shadow-lg"
              >
                <p className="font-semibold text-foreground">Rob Gioeli</p>
                <p className="text-sm text-muted-foreground">Founder</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
