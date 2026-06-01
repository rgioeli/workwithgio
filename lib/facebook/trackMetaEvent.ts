// lib/meta-pixel.ts

declare global {
    interface Window {
      fbq?: (...args: any[]) => void
    }
  }
  
  export function trackMetaEvent(
    eventName: string,
    data?: Record<string, string | number | boolean | undefined | null>
  ) {
    if (typeof window === "undefined") return
  
    console.log("[Meta Event]", eventName, data)
  
    if (window.fbq) {
      window.fbq("trackCustom", eventName, data || {})
    }
  }
  
  export function trackMetaLead(
    data?: Record<string, string | number | boolean | undefined | null>
  ) {
    if (typeof window === "undefined") return
  
    console.log("[Meta Lead]", data)
  
    if (window.fbq) {
      window.fbq("track", "Lead", data || {})
    }
  }

  