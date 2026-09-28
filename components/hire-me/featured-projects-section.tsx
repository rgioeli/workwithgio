import { projects } from "@/lib/hire-me/content"
import { ProjectCard } from "@/components/hire-me/project-card"
import { SectionHeading } from "@/components/hire-me/section-heading"

export function FeaturedProjectsSection() {
  return (
    <section
      id="featured-projects"
      className="scroll-mt-20 py-20 lg:py-28"
      aria-labelledby="featured-projects-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          id="featured-projects-heading"
          title="Featured Projects"
          description="Websites and business applications I have built and maintained."
        />
        <div className="mt-12 space-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
