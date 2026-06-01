import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import MetaPixel from '@/components/meta-pixel'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Free Website Giveaway | Built By Gio',
  description: 'Apply for a free modern website for your local business. Limited to 5 businesses only. Built by Rob Gioeli, founder of Built By Gio.',
  keywords: ['free website', 'local business', 'web development', 'Built By Gio', 'Rob Gioeli'],
  openGraph: {
    title: 'Free Website Giveaway | Built By Gio',
    description: 'Apply for a free modern website for your local business. Limited to 5 businesses only.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <MetaPixel />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
