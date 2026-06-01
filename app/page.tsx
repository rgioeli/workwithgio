"use client"

import { useRef } from "react"
import { HeroSection } from "@/components/hero-section"
import { ComparisonSection } from "@/components/comparison-section"
import { FoundationPlanSection } from "@/components/foundation-plan-section"
import { TransparencySection } from "@/components/transparency-section"
import { ScarcitySection } from "@/components/scarcity-section"
import { WhatYouGetSection } from "@/components/what-you-get-section"
import { ProjectsSection } from "@/components/projects-section"
import { TrustSection } from "@/components/trust-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"
import { OptionalServicesSection } from "@/components/optional-services-section"
import { ApplicationForm } from "@/components/application-form"
import { MobileStickyCta } from "@/components/mobile-sticky-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const heroApplyButtonRef = useRef<HTMLButtonElement>(null)

  const scrollToForm = () => {
    // Scroll to progress bar for better mobile UX
    progressRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <HeroSection onApplyClick={scrollToForm} applyButtonRef={heroApplyButtonRef} />
      <ComparisonSection />
      <FoundationPlanSection />
      <TransparencySection />
      <ScarcitySection />
      <WhatYouGetSection />
      <ProjectsSection />
      <TrustSection />
      <HowItWorksSection />
      <FaqSection />
      <OptionalServicesSection />

      {/* Application Form Section */}
      <section ref={formRef} id="apply" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ApplicationForm progressRef={progressRef} />
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyCta onApplyClick={scrollToForm} heroButtonRef={heroApplyButtonRef} />
    </main>
  )
}
