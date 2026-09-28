import { Card } from "@/components/ui/card"
import { education } from "@/lib/hire-me/content"
import { SectionHeading } from "@/components/hire-me/section-heading"

export function EducationSection() {
  return (
    <section
      className="border-t border-border py-16 lg:py-20"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading id="education-heading" title="Education" />
        <Card className="mt-8 gap-0 py-0 shadow-sm">
          <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-8">
            <div>
              <h3 className="font-semibold">{education.credential}</h3>
              <p className="text-sm text-muted-foreground">{education.school}</p>
            </div>
            <p className="text-sm text-muted-foreground">{education.year}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}
