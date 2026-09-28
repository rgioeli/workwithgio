import { Card } from "@/components/ui/card"
import { experience } from "@/lib/hire-me/content"
import { SectionHeading } from "@/components/hire-me/section-heading"

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 bg-muted/30 py-20 lg:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading id="experience-heading" title="Professional Experience" />
        <ol className="mt-10 space-y-6">
          {experience.map((role) => (
            <li key={role.company}>
              <Card className="gap-0 py-0 shadow-sm">
                <div className="px-6 py-8 sm:px-8">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {role.company}
                    </h3>
                    <p className="text-sm text-muted-foreground">{role.dates}</p>
                  </div>
                  <p className="mt-1 font-medium">{role.title}</p>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground">
                    {role.summary}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed sm:text-base"
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
