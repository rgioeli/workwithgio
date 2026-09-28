import type { Metadata } from "next"
import { ContactSection } from "@/components/hire-me/contact-section"
import { EducationSection } from "@/components/hire-me/education-section"
import { ExperienceSection } from "@/components/hire-me/experience-section"
import { FeaturedProjectsSection } from "@/components/hire-me/featured-projects-section"
import { HeroSection } from "@/components/hire-me/hero-section"
import { SiteHeader } from "@/components/hire-me/site-header"
import { StrengthsSection } from "@/components/hire-me/strengths-section"
import { TechStackSection } from "@/components/hire-me/tech-stack-section"
import { HIRE_ME_URL } from "@/lib/hire-me/content"

const title = "Robert Gioeli | Full Stack Developer"
const description =
  "Full Stack Developer specializing in TypeScript, React, Next.js, PostgreSQL, APIs, and production web applications. View projects and professional experience from Robert Gioeli."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: HIRE_ME_URL,
  },
  openGraph: {
    title,
    description,
    url: HIRE_ME_URL,
    type: "website",
  },
}

export default function HireMePage() {
  return (
    <div className="h-dvh overflow-y-auto bg-background text-foreground print:h-auto print:overflow-visible">
      <SiteHeader />
      <main>
        <HeroSection />
        <TechStackSection />
        <FeaturedProjectsSection />
        <ExperienceSection />
        <StrengthsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Robert Gioeli · Full Stack Developer</p>
          <p>Richmond, Indiana</p>
        </div>
      </footer>
    </div>
  )
}
