"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ProjectScreenshot } from "@/lib/hire-me/content"

type ScreenshotGalleryProps = {
  screenshots: ProjectScreenshot[]
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [active, setActive] = useState<ProjectScreenshot | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {screenshots.map((screenshot) => (
          <figure key={screenshot.title} className="flex flex-col">
            {screenshot.image ? (
              <button
                type="button"
                onClick={() => setActive(screenshot)}
                className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-muted/40 shadow-sm transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`View larger screenshot: ${screenshot.title}`}
              >
                <Image
                  src={screenshot.image}
                  alt={screenshot.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
              </button>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Screenshot needed
                </p>
                <p className="mt-2 max-w-xs text-base font-semibold text-foreground">
                  {screenshot.title}
                </p>
              </div>
            )}
            <figcaption className="mt-3 space-y-1">
              {screenshot.image ? (
                <p className="text-sm font-medium text-foreground">
                  {screenshot.title}
                </p>
              ) : null}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {screenshot.description}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <Dialog
        open={active !== null && active.image !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
          {active?.image ? (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.description}</DialogDescription>
              </DialogHeader>
              <div className="relative h-[70vh] w-full overflow-hidden rounded-lg border border-border bg-muted/40">
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
