"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-5 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="relative max-w-xs mx-auto lg:max-w-none">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl -rotate-3" />

                <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://pntf8qhv3c.ufs.sh/f/lSxmmLKPJplS69Hr1w5XdSograKyfI87e6vb950ktiFY2DBm"
                    alt="Rob Gioeli, Founder of Built By Gio"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Founder badge */}
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
                  <p className="font-semibold text-sm">Rob Gioeli</p>
                  <p className="text-xs text-muted-foreground">Founder</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Built By Someone Who{" "}
                <span className="text-primary">Actually Builds</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                {"Hi, I'm Rob Gioeli. I've been building websites and software for over 10 years."}
              </p>

              <p className="text-muted-foreground leading-relaxed text-pretty">
                {"This giveaway isn't about selling websites. It's about helping local businesses improve their online presence while I continue building my portfolio, case studies, and client success stories."}
              </p>

              <p className="text-muted-foreground leading-relaxed text-pretty">
                {"If I notice opportunities that could help your business grow, I'll point them out, but there is never any obligation to purchase additional services."}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="text-center px-4 py-2 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-xs text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center px-4 py-2 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-xs text-muted-foreground">Projects Delivered</p>
                </div>
                <div className="text-center px-4 py-2 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-xs text-muted-foreground">Hands-On</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
