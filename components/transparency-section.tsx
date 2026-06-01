"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function TransparencySection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm relative">
            {/* Accent line */}
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-primary rounded-full" />
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Founder image */}
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src="https://pntf8qhv3c.ufs.sh/f/lSxmmLKPJplS69Hr1w5XdSograKyfI87e6vb950ktiFY2DBm"
                    alt="Rob Gioeli"
                    width={80}
                    height={80}
                    className="object-cover object-top"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Why I&apos;m Offering This
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m growing Built By Gio and selecting 5 local businesses to build additional case studies, testimonials, and portfolio examples. Instead of charging the normal upfront website build fee, I&apos;m offering the website build for free to selected businesses in exchange for an honest testimonial and permission to showcase the project.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  If I notice other ways I may be able to help your business, I may point them out, but there is no obligation to purchase anything else.
                </p>
                
                <p className="text-sm font-medium text-foreground">
                  — Rob Gioeli, Founder
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
