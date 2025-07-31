"use client"

import { useRef, useEffect, useState } from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { gsap } from 'gsap'

const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme || theme

  useEffect(() => {
    if (iconRef.current && mounted && !isAnimating) {
      gsap.fromTo(iconRef.current, 
        { 
          y: currentTheme === 'light' ? -20 : 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.3,
          ease: "power2.out"
        }
      )
    }
  }, [currentTheme, mounted, isAnimating])
  
  const handleToggle = () => {
    if (!mounted || isAnimating) return
    
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setIsAnimating(true)
    
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: currentTheme === 'light' ? 20 : -20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setTheme(newTheme)
          // Small delay to ensure theme change is processed
          setTimeout(() => {
            setIsAnimating(false)
          }, 50)
        }
      })
    } else {
      setTheme(newTheme)
      setIsAnimating(false)
    }
  }

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="h-4 w-4 animate-pulse bg-current opacity-20 rounded" />
      </button>
    )
  }

  return (
    <button
      className="inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      onClick={handleToggle}
      disabled={isAnimating}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div 
        ref={iconRef} 
        className="inline-flex items-center justify-center"
      >
        {currentTheme === 'light' ? 
          <Sun className="h-5 w-5" /> : 
          <Moon className="h-5 w-5" />
        }
      </div>
    </button>
  )
}

export default ThemeToggleButton  