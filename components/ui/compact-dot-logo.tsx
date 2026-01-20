"use client"

import React from "react"

interface CompactDotLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function CompactDotLogo({ className = "", size = "md" }: CompactDotLogoProps) {
  const sizeConfig = {
    sm: { width: 120, height: 32, dotRadius: 1.5, gridGap: 4 },
    md: { width: 180, height: 48, dotRadius: 2, gridGap: 6 },
    lg: { width: 240, height: 64, dotRadius: 2.5, gridGap: 8 }
  }

  const config = sizeConfig[size]

  return (
    <div className={`${className}`}>
      <div className="rounded-lg overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${config.width} ${config.height}`}
          width="100%"
          height="100%"
          className="block"
        >
          {/* Background */}
          <rect x="0" y="0" width={config.width} height={config.height} fill="#0E0E0E" rx="8" />

          {/* Mask that reveals dots only where text is drawn */}
          <mask id="compact-mask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={config.width} height={config.height} fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight={900}
              fontSize={config.height * 0.6}
              letterSpacing="0.05em"
              fill="white"
            >
              VD
            </text>
          </mask>

          {/* Dots grid */}
          <g mask="url(#compact-mask)">
            {Array.from({ length: Math.ceil(config.width / config.gridGap) }, (_, x) =>
              Array.from({ length: Math.ceil(config.height / config.gridGap) }, (_, y) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x * config.gridGap + config.gridGap / 2}
                  cy={y * config.gridGap + config.gridGap / 2}
                  r={config.dotRadius}
                  fill="#F2F0E6"
                />
              ))
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}
