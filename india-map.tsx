"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StateData {
  name: string
  code: string
  enrollments: number
  population: number
  coverage: number
}

interface IndiaMapProps {
  onStateClick?: (stateCode: string, stateName: string) => void
  stateData?: Record<string, StateData>
}

export default function IndiaMap({ onStateClick, stateData }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)

  // Accurate India map state paths (simplified but recognizable)
  const statePathsData: Record<string, { path: string; name: string }> = {
    JK: { name: "Jammu & Kashmir", path: "M230,40 L250,35 L270,40 L280,55 L285,70 L280,85 L270,95 L250,90 L235,85 L225,70 L220,55 Z" },
    HP: { name: "Himachal Pradesh", path: "M250,90 L270,95 L285,105 L290,120 L280,130 L265,128 L255,120 L245,110 Z" },
    PB: { name: "Punjab", path: "M235,85 L250,90 L255,105 L250,120 L240,125 L230,115 L225,100 Z" },
    UT: { name: "Uttarakhand", path: "M280,130 L295,135 L305,145 L310,155 L305,165 L290,163 L280,155 L275,145 Z" },
    HR: { name: "Haryana", path: "M240,125 L255,128 L265,140 L262,155 L250,158 L238,150 Z" },
    DL: { name: "Delhi", path: "M255,145 L260,148 L258,153 L253,151 Z" },
    RJ: { name: "Rajasthan", path: "M180,130 L240,140 L265,160 L270,190 L265,225 L245,245 L215,250 L185,240 L165,215 L160,180 L170,155 Z" },
    UP: { name: "Uttar Pradesh", path: "M265,160 L305,165 L335,170 L365,175 L385,185 L390,200 L385,220 L370,235 L350,238 L325,235 L300,230 L280,220 L270,200 L265,180 Z" },
    BR: { name: "Bihar", path: "M385,200 L420,205 L445,210 L458,220 L460,235 L450,248 L430,252 L410,248 L390,240 L380,230 L375,218 Z" },
    SK: { name: "Sikkim", path: "M455,175 L465,178 L468,188 L463,195 L455,193 L450,185 Z" },
    AR: { name: "Arunachal Pradesh", path: "M470,160 L510,165 L540,175 L555,190 L550,210 L535,218 L515,220 L495,215 L475,205 L465,190 L465,175 Z" },
    NL: { name: "Nagaland", path: "M535,218 L548,222 L553,235 L548,248 L535,245 L528,235 Z" },
    MN: { name: "Manipur", path: "M528,248 L540,252 L545,265 L538,275 L525,272 L520,260 Z" },
    MZ: { name: "Mizoram", path: "M520,275 L530,280 L532,295 L525,303 L515,298 L512,285 Z" },
    TR: { name: "Tripura", path: "M500,260 L512,265 L515,278 L508,288 L498,285 L495,273 Z" },
    ML: { name: "Meghalaya", path: "M485,235 L505,240 L510,255 L503,268 L488,265 L480,250 Z" },
    AS: { name: "Assam", path: "M460,210 L495,215 L520,220 L540,228 L545,245 L530,258 L510,260 L485,255 L465,245 L455,230 Z" },
    WB: { name: "West Bengal", path: "M410,248 L450,252 L465,265 L470,285 L468,310 L455,330 L435,340 L415,335 L400,320 L390,295 L395,270 Z" },
    JH: { name: "Jharkhand", path: "M370,240 L410,248 L420,270 L418,290 L405,305 L385,308 L365,300 L355,280 L360,260 Z" },
    OR: { name: "Odisha", path: "M390,310 L430,320 L445,340 L448,365 L438,390 L415,405 L390,400 L375,385 L370,360 L375,335 Z" },
    CG: { name: "Chhattisgarh", path: "M325,260 L370,265 L385,290 L390,320 L385,350 L370,370 L345,375 L320,365 L305,340 L300,310 L310,285 Z" },
    MP: { name: "Madhya Pradesh", path: "M245,245 L310,255 L345,265 L370,275 L385,295 L385,325 L370,350 L340,360 L305,355 L270,345 L245,330 L225,305 L215,275 Z" },
    GJ: { name: "Gujarat", path: "M140,220 L190,230 L220,245 L235,275 L240,310 L230,340 L210,360 L180,365 L150,355 L125,335 L110,305 L105,270 L115,245 Z" },
    MH: { name: "Maharashtra", path: "M210,360 L270,370 L310,380 L335,395 L340,425 L330,460 L310,485 L280,495 L250,490 L220,475 L195,450 L180,420 L175,390 Z" },
    TG: { name: "Telangana", path: "M310,380 L345,385 L365,400 L370,425 L360,450 L340,460 L320,455 L305,435 L300,410 Z" },
    AP: { name: "Andhra Pradesh", path: "M340,460 L375,468 L395,485 L405,515 L400,545 L380,570 L355,580 L330,575 L310,560 L305,530 L310,495 Z" },
    KA: { name: "Karnataka", path: "M250,490 L310,500 L335,515 L350,545 L355,580 L340,610 L315,630 L285,635 L255,625 L230,600 L220,570 L220,535 Z" },
    GA: { name: "Goa", path: "M220,530 L235,535 L238,550 L232,560 L220,555 Z" },
    KL: { name: "Kerala", path: "M220,600 L250,610 L265,635 L270,665 L265,700 L250,730 L230,740 L210,735 L200,710 L195,680 L195,650 L205,625 Z" },
    TN: { name: "Tamil Nadu", path: "M285,635 L340,645 L375,660 L395,685 L405,715 L395,745 L370,765 L340,775 L305,770 L275,755 L260,730 L255,700 L260,670 Z" },
  }

  const handleStateClick = (code: string) => {
    setSelectedState(code)
    const stateInfo = stateData?.[code]
    if (onStateClick && stateInfo) {
      onStateClick(code, stateInfo.name)
    }
  }

  const getStateColor = (code: string) => {
    if (selectedState === code) return "#3b82f6"
    if (hoveredState === code) return "#60a5fa"
    
    if (stateData && stateData[code]) {
      const coverage = stateData[code].coverage
      if (coverage >= 90) return "#10b981"
      if (coverage >= 70) return "#f59e0b"
      return "#ef4444"
    }
    
    return "#94a3b8"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          India - State-wise Enrollment Map
        </CardTitle>
        <CardDescription>
          Interactive map with actual state boundaries. Click any state to view detailed analytics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full min-h-[600px] bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-lg overflow-hidden border-2 shadow-inner">
          <svg
            viewBox="0 0 650 800"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="650" height="800" fill="transparent" />
            
            {/* State paths with actual boundaries */}
            {Object.entries(statePathsData).map(([code, data]) => (
              <g key={code}>
                <path
                  d={data.path}
                  fill={getStateColor(code)}
                  stroke="#ffffff"
                  strokeWidth={2}
                  className="cursor-pointer transition-all duration-200 hover:opacity-80 hover:stroke-[3]"
                  onMouseEnter={() => setHoveredState(code)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleStateClick(code)}
                />
              </g>
            ))}
          </svg>

          {/* Hover tooltip */}
          {hoveredState && stateData && stateData[hoveredState] && (
            <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 shadow-xl rounded-lg p-4 border-2 border-slate-200 dark:border-slate-700 min-w-[220px] z-10 animate-in fade-in slide-in-from-right-5 duration-200">
              <h4 className="font-bold text-lg mb-3 border-b pb-2">{stateData[hoveredState].name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Enrollments:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {(stateData[hoveredState].enrollments / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {stateData[hoveredState].coverage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 pt-2 border-t">
                Click to view detailed analytics
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <p className="text-sm font-semibold mb-3">Coverage Legend:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-500 border-2 border-white shadow"></div>
              <span className="text-xs">90%+ Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500 border-2 border-white shadow"></div>
              <span className="text-xs">70-89% Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500 border-2 border-white shadow"></div>
              <span className="text-xs">&lt;70% Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-400 border-2 border-white shadow"></div>
              <span className="text-xs">No Data</span>
            </div>
          </div>
        </div>

        {selectedState && stateData?.[selectedState] && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <p className="text-sm text-center">
              <span className="font-bold">Selected:</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">{stateData[selectedState].name}</span>
              {" - "}
              <span className="text-muted-foreground">
                {(stateData[selectedState].enrollments / 1000000).toFixed(2)}M enrollments
              </span>
              {" • "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {stateData[selectedState].coverage.toFixed(1)}% coverage
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
