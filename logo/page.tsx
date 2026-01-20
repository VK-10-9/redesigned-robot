"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LOGO_VARIATIONS, LOGO_DIMENSIONS } from "@/src/constants/ui"

export default function LogoShowcase() {
  return (
  <div className="min-h-screen bg-background">
      {/* Header & Intro */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="neutral" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center mb-6 gap-2">
              <div className="rounded-2xl shadow-xl p-6 border border-border bg-card">
                <Image
                  src="/vishwa-logo.jpg"
                  alt="VishwaDev Logo"
                  width={LOGO_DIMENSIONS.main.width}
                  height={LOGO_DIMENSIONS.main.height}
                  className="rounded-xl bg-white mx-auto hover:scale-105 transition-transform duration-300"
                  priority
                />
                <a
                  href="/vishwa-logo.jpg"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow"
                >
                  Download Logo
                </a>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              VishwaDev Logo Gallery
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore and download official VishwaDev logo assets. Choose the style that fits your project—classic, color, minimal, or playful. For best results, use the highest resolution available.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Variations */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Logo Variations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {LOGO_VARIATIONS.map((variation) => (
                <div key={variation.id} className="rounded-2xl shadow-xl bg-card border border-border p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <Image
                    src={`/${variation.id}.jpg`}
                    alt={`Logo ${variation.name}`}
                    width={LOGO_DIMENSIONS.variation.width}
                    height={LOGO_DIMENSIONS.variation.height}
                    className="rounded-xl bg-white mx-auto mb-2"
                  />
                  <a
                    href={`/${variation.id}.jpg`}
                    download
                    className="inline-block mt-2 px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition shadow"
                  >
                    Download
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {variation.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-primary">Logo Usage Guidelines</h3>
            <ul className="list-disc list-inside text-muted-foreground text-base space-y-2">
              <li>Use the logo as provided. Do not stretch, distort, or recolor.</li>
              <li>Maintain clear space around the logo for visual clarity.</li>
              <li>For dark backgrounds, use the light or color logo. For light backgrounds, use the dark or color logo.</li>
              <li>Contact the VishwaDev team for custom branding or partnership requests.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
