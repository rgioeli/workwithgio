import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { techGroups } from "@/lib/hire-me/content"
import { SectionHeading } from "@/components/hire-me/section-heading"

export function TechStackSection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28" aria-labelledby="technologies-heading">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          id="technologies-heading"
          title="Technologies I Work With"
          description="Tools I use across production projects, grouped by the part of the stack they belong to."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group) => (
            <li key={group.label}>
              <Card className="h-full gap-4 py-5 shadow-sm">
                <CardHeader className="px-5">
                  <h3 className="text-sm font-semibold">{group.label}</h3>
                </CardHeader>
                <CardContent className="px-5">
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge
                          variant="outline"
                          className="h-auto whitespace-normal px-2 py-1 text-left font-normal"
                        >
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
