import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { strengths } from "@/lib/hire-me/content"
import { SectionHeading } from "@/components/hire-me/section-heading"

export function StrengthsSection() {
  return (
    <section
      className="py-20 lg:py-28"
      aria-labelledby="strengths-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          id="strengths-heading"
          title="What I Bring to a Development Team"
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {strengths.map((strength) => (
            <li key={strength.title}>
              <Card className="h-full gap-3 py-5 shadow-sm transition-colors hover:border-foreground/20">
                <CardHeader className="px-5">
                  <h3 className="text-base font-semibold leading-snug">
                    {strength.title}
                  </h3>
                </CardHeader>
                <CardContent className="px-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {strength.text}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
