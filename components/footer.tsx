import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-4iEoYQcmcTGol0zmtdhvTAPbfdcrYn.png"
              alt="Built By Gio - Web Development"
              width={140}
              height={70}
              className="h-auto w-auto max-h-12"
            />
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Built By Gio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
