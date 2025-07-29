"use client"

import { useRef, useEffect, useState } from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { gsap } from 'gsap'
// import { Button } from './ui/button'

const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const iconRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme || theme

  useEffect(() => {
    if (iconRef.current && mounted) {
      gsap.fromTo(iconRef.current, 
        { 
          y: currentTheme === 'light' ? -20 : 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.2,
          ease: "power2.out"
        }
      )
    }
  }, [currentTheme, mounted])
  
  const handleToggle = () => {
    if (!mounted) return
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: currentTheme === 'light' ? 20 : -20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setTheme(newTheme)
        }
      })
    } else {
      setTheme(newTheme)
    }
  }

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
        disabled
      >
        <div className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      className="inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <div ref={iconRef} style={{ display: 'inline-block' }}>
        {currentTheme === 'light' ? 
          <Sun className="h-5 w-5" /> : 
          <Moon className="h-5 w-5" />
        }
      </div>
    </button>
  )
}

export default ThemeToggleButton