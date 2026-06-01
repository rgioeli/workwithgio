"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    name: "Manpower Richmond",
    url: "https://mprichmond.com",
    description:
      "Staffing company website redesign focused on usability, mobile responsiveness, hiring funnels, and local SEO.",
    tags: ["Staffing", "Web Design", "SEO"],
  },
  {
    name: "B&F Plastics",
    url: "https://bfplastics.com",
    description:
      "Manufacturer website featuring product information, business resources, and a modern user experience.",
    tags: ["Manufacturing", "Web Development", "Business Website"],
  },
  {
    name: "Earlywine Pest Control",
    url: "https://earlywinepestcontrol.com",
    description:
      "Service business website focused on lead generation, mobile usability, and customer conversions.",
    tags: ["Pest Control", "Lead Generation", "Service Business"],
  },
  {
    name: "The Contracting Company",
    url: "https://thecontractingco.com",
    description:
      "Contractor website with lead generation systems, appointment scheduling, and customer inquiry workflows.",
    tags: ["Contractor", "Lead Generation", "Scheduling"],
  },
  {
    name: "Legacy Cleaning Services",
    url: "https://legacycleaningservices.site",
    description:
      "Professional cleaning company website focused on service presentation and customer inquiries.",
    tags: ["Cleaning Company", "Local Business", "Lead Generation"],
  },
  {
    name: "Firehouse BBQ & Blues",
    url: "https://firehousebbqandblues.com",
    description:
      "Restaurant website showcasing menu information, events, hiring information, and customer engagement.",
    tags: ["Restaurant", "Hospitality", "Web Design"],
  },
]

export function ProjectsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Real Businesses. Real Projects.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            {"Before applying, feel free to review some of the businesses I've worked with."}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Branded placeholder card */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video bg-foreground overflow-hidden block cursor-pointer"
                >
                  {/* Diagonal accent stripe */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary rotate-45" />
                  <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-primary/20 rotate-45" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
                        Built By Gio
                      </p>
                      <h4 className="text-background text-xl font-bold text-balance leading-tight">
                        {project.name}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-primary-foreground font-medium">
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mb-3"
                  >
                    {new URL(project.url).hostname}
                  </a>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
