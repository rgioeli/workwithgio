import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/hire-me/content"
import { ScreenshotGallery } from "@/components/hire-me/screenshot-gallery"

type ProjectCardProps = {
  project: Project
}

function hasProjectUrl(url: string | null): url is string {
  return url !== null && url.length > 0
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <div className="divide-y divide-border">
        <header className="px-6 py-8 sm:px-8">
          <p className="text-sm font-medium text-primary">{project.type}</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-2xl font-semibold tracking-tight text-balance">
              {project.name}
            </h3>
            {hasProjectUrl(project.projectUrl) ? (
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground">
            {project.description}
          </p>
        </header>

        <div className="px-6 py-8 sm:px-8">
          <h4 className="text-sm font-semibold text-foreground">Technologies</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge variant="outline" className="font-normal">
                  {technology}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <h4 className="text-sm font-semibold text-foreground">Highlights</h4>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed text-foreground sm:text-base"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <h4 className="text-sm font-semibold text-foreground">Screenshots</h4>
          <div className="mt-4">
            <ScreenshotGallery screenshots={project.screenshots} />
          </div>
        </div>
      </div>
    </Card>
  )
}
