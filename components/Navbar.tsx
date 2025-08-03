'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from "../lib/utils"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes"
import ThemeToggleButton from './Theme-Toggle-Button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { FaHome,FaRobot, FaRegUserCircle } from "react-icons/fa";

const navItems = [
    { label:'Home', href:'/home'},
    { label:'Companions', href:'/companions'},
    { label:'My Journey', href:'/my-journey'},
]

const Navbar = () => {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme()
  const navLinksRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Check if current page is landing page or sign-in page
  const isLandingPage = pathname === '/' || pathname === '/sign-in';

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current theme - use resolvedTheme for better accuracy
  const currentTheme = resolvedTheme || theme;

  // Logo source logic - default to light since defaultTheme="light"
  const logoSrc = !mounted 
    ? "/images/Vector-Minderva.svg" // Default light logo for SSR
    : currentTheme === 'dark' 
      ? "/images/Vector-Minderva-Dark.svg" 
      : "/images/Vector-Minderva.svg";

  // Set background position for active page
  const setActivePosition = useCallback(() => {
    if (isLandingPage) return; // Skip animation for landing page
    
    const activeIndex = navItems.findIndex(item => item.href === pathname);
    if (activeIndex !== -1 && navLinksRef.current && backgroundRef.current) {
      const activeElement = navLinksRef.current.children[activeIndex + 1] as HTMLElement;
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const parentRect = navLinksRef.current.getBoundingClientRect();
        
        const x = rect.left - parentRect.left;
        const width = rect.width;
        
        gsap.to(backgroundRef.current, {
          x: x,
          width: width,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [pathname, isLandingPage]);

  useEffect(() => {
    if (!isLandingPage) {
      setTimeout(setActivePosition, 100);
    }
  }, [pathname, setActivePosition, isLandingPage]);

  // Handle mouse enter on navigation items
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isLandingPage) return;
    
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    
    if (!navLinksRef.current || !backgroundRef.current) return;
    
    const parentRect = navLinksRef.current.getBoundingClientRect();
    
    const x = rect.left - parentRect.left;
    const width = rect.width;
    
    // Move background to hovered item
    gsap.to(backgroundRef.current, {
      x: x,
      width: width,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Handle mouse leave - return to active position
  const handleMouseLeave = () => {
    if (!isLandingPage) {
      setActivePosition();
    }
  };

  return (
    <div className="relative">
      <nav className="navbar">
        {/* Logo */}
        {isLandingPage ? (
          <Link href="/" className="flex-shrink-0">
          <div className="flex-shrink-0">
            <Image 
              src={logoSrc}
              alt="Minderva logo" 
              width={190}
              height={190}
              className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
              priority
            />
          </div>
          </Link>
        ) : (
          // With link for other pages
          <Link href="/home" className="flex-shrink-0">
            <div>
              <Image 
                src={logoSrc}
                alt="Minderva logo" 
                width={190}
                height={190}
                className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                priority
              />
            </div>
          </Link>
        )}
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {!isLandingPage && (
            // Hide navigation items on landing page
            <div 
              ref={navLinksRef}
              className="flex items-center gap-0 relative"
              onMouseLeave={handleMouseLeave}
            >
              {/* Single background that moves between active and hover */}
              <div 
                ref={backgroundRef}
                className="nav-animated-bg"
              />
              
              {/* Navigation Items */}
              {navItems.map(({label, href }) => (
                <Link 
                  href={href} 
                  key={label} 
                  className={cn(
                    "nav-hover-btn-new",
                    pathname === href && 'font-primary font-bold'
                  )}
                  onMouseEnter={handleMouseEnter}
                >
                  {label}
                </Link>
              ))}
              
              {/* Sign In Button with same styling as nav items */}
              <SignedOut>
                <SignInButton>
                  <button 
                    className="nav-hover-btn-new font-medium cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          )}
          
          {/* User Button for signed in users (hidden on landing page) */}
          {!isLandingPage && (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}
          
          {/* Show Sign In button on landing page */}
          {isLandingPage && (
            <SignedOut>
              <SignInButton>
                <button className="px-3 py-2 bg-black cursor-pointer dark:bg-white text-sm text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          )}
          
          {/* Theme Toggle Button - Always visible */}
          <ThemeToggleButton />
        </div>

        {/* Mobile Menu Container */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle Button - Mobile */}
          <ThemeToggleButton />
          
          {/* Hide UserButton on landing page */}
          {!isLandingPage && (
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border border-input",
                    userButtonPopoverCard: "right-0 w-48", 
                    userButtonPopoverActions: "flex-col"
                  }
                }}
              >
                <UserButton.MenuItems>
                  {/* Navigation items with emoji icons */}
                  <UserButton.Link 
                    label="Home"
                    href="/home"
                    labelIcon={<span className="text-base"><FaHome /></span>}
                  />
                  <UserButton.Link 
                    label="Companions"
                    href="/companions"
                    labelIcon={<span className="text-base"><FaRobot /></span>}
                  />
                  <UserButton.Link 
                    label="My Journey"
                    href="/my-journey"
                    labelIcon={<span className="text-base"><FaRegUserCircle /></span>}
                  />
                  
                  {/* Clerk will automatically add separator and account options */}
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          )}
          
          {/* For Non-Signed In Users phone: Simple Sign In Button */}
          <SignedOut>
            <SignInButton>
              <button className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md text-sm font-medium">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </div>
  )
}

export default Navbar