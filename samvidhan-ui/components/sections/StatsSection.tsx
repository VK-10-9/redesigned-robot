'use client'

import { Card, CardContent } from "@/components/ui/card"
import { STATS } from "@/lib/constants"

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow hover:border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
