import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, RESUME_PDF_PATH } from "@/lib/hire-me/content";

const quietButton =
  "hover:bg-muted hover:text-foreground dark:hover:bg-muted dark:hover:text-foreground";

// Replace this path with your desired image path and alt text
const HERO_IMAGE = "/hire-me/me.png";
const HERO_IMAGE_ALT = "Robert Gioeli, Full Stack Developer";

export function HeroSection() {
  return (
    <section id="top" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left Side: Text Content */}
          <div className="max-w-3xl flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Robert Gioeli
              <span className="mt-3 block text-2xl font-semibold tracking-tight text-foreground/80 sm:text-3xl">
                Full Stack Developer
              </span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Richmond, Indiana • U.S. Citizen
            </p>
            <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
              I build and maintain full-stack web applications using TypeScript,
              React, Next.js, APIs, and PostgreSQL. My work includes
              customer-facing websites, internal dashboards, lead management
              systems, custom business applications, and third-party
              integrations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#featured-projects">View My Work</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <a href={`mailto:${CONTACT_EMAIL}`}>Contact Me</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className={`w-full sm:w-auto ${quietButton}`}
              >
                <a href={RESUME_PDF_PATH} download>
                  <Download aria-hidden="true" />
                  Download Resume
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          {/* Right Side: Hero Image */}
          <div className="flex justify-center items-center lg:justify-end flex-shrink-0">
            <img
              src={HERO_IMAGE}
              alt={HERO_IMAGE_ALT}
              className="w-52 h-52 rounded-full object-cover shadow-lg border border-border lg:w-64 lg:h-64"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
