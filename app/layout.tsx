import type React from "react"
import type { Metadata } from "next"
import { Fira_Code, Roboto_Mono } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-code",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RiazOS - Ahsan Riaz Portfolio",
  description: "The Ghost in the Machine - Full-Stack Developer & Problem Solver",
  keywords: ["Full-Stack Developer", "React", "Next.js", "Python", "Data Automation", "Web Scraping"],
  authors: [{ name: "Ahsan Riaz" }],
  openGraph: {
    title: "RiazOS - Ahsan Riaz Portfolio",
    description: "Interactive portfolio showcasing full-stack development and automation expertise",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${firaCode.variable} ${robotoMono.variable}`}>
      <body className={`${firaCode.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
