"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

interface MobileStickyCtaProps {
  onApplyClick: () => void
  heroButtonRef: React.RefObject<HTMLButtonElement | null>
  applicationSectionId?: string
}

export function MobileStickyCta({ 
  onApplyClick, 
  heroButtonRef,
  applicationSectionId = "apply" 
}: MobileStickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [heroButtonVisible, setHeroButtonVisible] = useState(true)
  const [isNearApplication, setIsNearApplication] = useState(false)

  // Track hero button visibility with IntersectionObserver
  useEffect(() => {
    const heroButton = heroButtonRef.current
    if (!heroButton) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroButtonVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(heroButton)
    return () => observer.disconnect()
  }, [heroButtonRef])

  // Track application section proximity with scroll listener
  const handleScroll = useCallback(() => {
    const applicationSection = document.getElementById(applicationSectionId)
    
    if (applicationSection) {
      const rect = applicationSection.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Consider near application when top of section is within 80% of viewport height
      setIsNearApplication(rect.top < viewportHeight * 0.8)
    }
  }, [applicationSectionId])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Show sticky CTA only when:
  // 1. Hero button is NOT visible
  // 2. NOT near the application section
  useEffect(() => {
    setIsVisible(!heroButtonVisible && !isNearApplication)
  }, [heroButtonVisible, isNearApplication])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border md:hidden z-50"
        >
          <Button 
            onClick={onApplyClick} 
            className="w-full py-6 text-lg font-semibold"
          >
            Apply Now
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
