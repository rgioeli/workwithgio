import { Button } from "@/components/ui/button"
import { CONTACT_EMAIL } from "@/lib/hire-me/content"

const quietButton =
  "hover:bg-muted hover:text-foreground dark:hover:bg-muted dark:hover:text-foreground"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur print:static">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <a
          href="#top"
          className="min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="block truncate text-sm font-semibold">
            Robert Gioeli
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Full Stack Developer
          </span>
        </a>
        <nav aria-label="Page" className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={`hidden md:inline-flex ${quietButton}`}
          >
            <a href="#featured-projects">Projects</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={`hidden md:inline-flex ${quietButton}`}
          >
            <a href="#experience">Experience</a>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
