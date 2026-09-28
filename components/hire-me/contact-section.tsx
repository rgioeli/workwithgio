import { Button } from "@/components/ui/button"
import {
  CONTACT_EMAIL,
  HIRE_ME_URL,
  RESUME_PDF_PATH,
} from "@/lib/hire-me/content"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-foreground text-background"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            Let&apos;s Build Something Useful
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-background/80 sm:text-lg">
            I&apos;m currently open to full-stack and web development
            opportunities where I can contribute to real applications, solve
            business problems, and continue growing as a developer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={`mailto:${CONTACT_EMAIL}`}>Email Robert</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background sm:w-auto dark:border-background/30 dark:bg-transparent dark:text-background dark:hover:bg-background/10 dark:hover:text-background"
            >
              <a
                href={RESUME_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-background/80">{CONTACT_EMAIL}</p>
          <p className="mt-2 text-sm">
            <a
              href={HIRE_ME_URL}
              className="text-background/80 underline-offset-4 hover:text-background hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              workwithgio.com/hire-me
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
