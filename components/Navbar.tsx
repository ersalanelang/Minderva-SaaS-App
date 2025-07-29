'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from "../lib/utils"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes"
import ThemeToggleButton from './Theme-Toggle-Button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


const navItems = [
    { label:'Home', href:'/'},
    { label:'Companions', href:'/companions'},
    { label:'My Journey', href:'/my-journey'},
]

const Navbar = () => {
  const pathname = usePathname();
  const { theme } = useTheme()
  const navLinksRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Set background position for active page
  const setActivePosition = useCallback(() => {
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
  }, [pathname]);

  useEffect(() => {
    setTimeout(setActivePosition, 100); // Small delay to ensure DOM is ready
  }, [pathname, setActivePosition]);

  // Handle mouse enter on navigation items
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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
    setActivePosition();
  };

  return (
    <div className="relative">
      <nav className="navbar">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div>
            <Image 
              src={theme === 'dark' ? "/images/Vector-Minderva-Dark.svg" : "/images/Vector-Minderva.svg"}
              alt="logo" 
              width={190}
              height={190}
              className="transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
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
          
          {/* User Button for signed in users */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          
          {/* Theme Toggle Button - Desktop */}
          <ThemeToggleButton />
        </div>

        {/* Mobile Menu Container */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle Button - Mobile */}
          <ThemeToggleButton />
          
          {/* For Signed In Users: Only UserButton with everything inside */}
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
              {/* <UserButton.MenuItems>
                {navItems.map(({ label, href }) => (
                  <UserButton.Link 
                    key={label}
                    label={label}
                    href={href}
                    labelIcon={
                      pathname === href ? 
                        <div className="w-2 h-2 bg-blue-600 rounded-full" /> : 
                        <div className="w-2 h-2" /> 
                    }
                  />
                ))}
              </UserButton.MenuItems> */}
              <UserButton.MenuItems>
                {/* Navigation items with emoji icons */}
                <UserButton.Link 
                  label="Home"
                  href="/"
                  labelIcon={<span className="text-base">🏠</span>}
                />
                <UserButton.Link 
                  label="Companions"
                  href="/companions"
                  labelIcon={<span className="text-base">👥</span>}
                />
                <UserButton.Link 
                  label="My Journey"
                  href="/my-journey"
                  labelIcon={<span className="text-base">📚</span>}
                />
                
                {/* Clerk will automatically add separator and account options */}
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          
          {/* For Non-Signed In Users: Simple Sign In Button */}
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