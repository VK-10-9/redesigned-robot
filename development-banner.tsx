"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Wrench, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DevelopmentBannerProps {
  message?: string
  isDismissible?: boolean
  variant?: "warning" | "info" | "construction"
  autoShow?: boolean
  showDelay?: number
}

export function DevelopmentBanner({ 
  message = "🚧 This website is currently under development. Some features may not work as expected.", 
  isDismissible = true,
  variant = "construction",
  autoShow = true,
  showDelay = 1000
}: DevelopmentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the banner today
    const lastDismissed = localStorage.getItem('dev-banner-dismissed')
    const today = new Date().toDateString()
    
    if (lastDismissed === today) {
      return // Don't show if dismissed today
    }

    if (autoShow) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, showDelay)
      
      return () => clearTimeout(timer)
    }
  }, [autoShow, showDelay])

  const handleDismiss = () => {
    setIsVisible(false)
    // Remember dismissal for today
    localStorage.setItem('dev-banner-dismissed', new Date().toDateString())
  }

  if (!isVisible) return null

  const variantStyles = {
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      accent: "bg-yellow-500"
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200", 
      text: "text-blue-800",
      accent: "bg-blue-500"
    },
    construction: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      accent: "bg-orange-500"
    }
  }

  const getIcon = () => {
    switch (variant) {
      case "warning":
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />
      case "info":
        return <AlertTriangle className="w-8 h-8 text-blue-600" />
      case "construction":
        return <Construction className="w-8 h-8 text-orange-600" />
      default:
        return <Wrench className="w-8 h-8 text-orange-600" />
    }
  }

  const styles = variantStyles[variant]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={isDismissible ? handleDismiss : undefined}
      />
      
      {/* Popup Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-in zoom-in duration-300">
        <div className={`
          relative max-w-md w-full mx-auto 
          ${styles.bg} ${styles.border} border-2 rounded-xl shadow-2xl
          transform transition-all duration-300
        `}>
          {/* Colored accent bar */}
          <div className={`h-2 ${styles.accent} rounded-t-xl`} />
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getIcon()}
              </div>
              
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${styles.text} mb-2`}>
                  Under Development
                </h3>
                <p className={`text-sm ${styles.text} opacity-90 leading-relaxed`}>
                  {message}
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="neutral"
                size="sm"
                onClick={() => setIsVisible(false)}
                className={`${styles.text} border-current hover:bg-current hover:text-white border`}
              >
                Continue Anyway
              </Button>
              {isDismissible && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleDismiss}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Got it
                </Button>
              )}
            </div>
          </div>
          
          {/* Close button */}
          {isDismissible && (
            <Button
              variant="neutral"
              size="sm"
              onClick={handleDismiss}
              className="absolute top-4 right-4 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default DevelopmentBanner
