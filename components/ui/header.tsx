"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, MoveRight, X, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { navigationItems } from "@/src/constants/navigation"
import Image from "next/image"

function Header1() {
  const [isOpen, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Helpers for active-route styling
  const isPathActive = (href: string | undefined) => {
    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href)
  }

  const isGroupActive = (items?: { href: string }[]) => {
    return items?.some((i) => isPathActive(i.href)) ?? false
  }

  useEffect(() => {
    setIsMounted(true)
    // Check if user is signed in by checking localStorage or pathname
    const checkAuthStatus = () => {
      // Check if we're on a protected route (dashboard, profile, etc.)
      const protectedRoutes = ['/dashboard', '/profile', '/dashboard/new-project']
      const isOnProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
      
      // Check localStorage for auth token (in a real app)
      const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
      
      setIsSignedIn(isOnProtectedRoute || !!authToken)
    }
    
    checkAuthStatus()
  }, [pathname])

  // Close mobile menu with Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleSignOut = () => {
    // Clear auth token and redirect to home
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
    setIsSignedIn(false)
    router.push('/')
    setOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setOpen(false)
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isMounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-background/95 backdrop-blur-md border-b">
      <div className="container relative mx-auto min-h-16 sm:min-h-20 flex gap-4 flex-row items-center justify-between px-4 sm:px-6">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center space-x-3 z-50" onClick={() => setOpen(false)}>
          {/* Option 1: Logo Image (visible on all screens) */}
          <div className="flex items-center space-x-2">
            <Image
              src="/vishwa-logo.jpg"
              alt="VishwaDev Logo"
              width={40}
              height={40}
              className="rounded-lg bg-white"
              priority
            />
            <span className="text-lg font-bold">VishwaDev</span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          buttonVariants({ variant: isPathActive(item.href) ? 'default' : 'neutral' }),
                          isPathActive(item.href) ? undefined : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger
                        className={
                          `font-medium text-sm bg-transparent hover:bg-muted data-[state=open]:bg-muted ` +
                          (isGroupActive(item.items)
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground')
                        }
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4 bg-background border">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base font-semibold">{item.title}</p>
                              <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                            <Button
                              variant="default"
                              size="sm"
                              asChild
                            >
                              <Link
                                href={
                                  item.title.toLowerCase() === 'projects'
                                    ? '/projects'
                                    : (item.items?.[0]?.href ?? '/')
                                }
                              >
                                Get Started
                              </Link>
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink asChild key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className={
                                    `flex flex-row justify-between items-center py-2 px-4 rounded transition-colors ` +
                                    (isPathActive(subItem.href)
                                      ? 'bg-muted text-foreground'
                                      : 'text-muted-foreground hover:text-foreground hover:bg-muted')
                                  }
                                >
                                  <span>{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Action Buttons - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-4">
          <Button asChild variant="neutral" className="text-muted-foreground hover:text-foreground">
            <Link href="/dashboard/new-project">Submit Project</Link>
          </Button>
          <div className="border-r h-6"></div>
          
          {isSignedIn ? (
            // Signed in state
            <>
              <Button asChild variant="neutral" className="text-muted-foreground hover:text-foreground">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="neutral" className="text-muted-foreground hover:text-foreground">
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                variant="neutral"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            // Not signed in state
            <>
              <Button asChild variant="neutral" className="text-muted-foreground hover:text-foreground">
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/discord">Join Community</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center">
          <Button
            variant="neutral"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(!isOpen)
            }}
            className="z-[60] h-10 w-10 border-border hover:bg-muted relative"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            {/* Menu Panel */}
            <div 
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l shadow-2xl transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-lg font-semibold text-foreground">Menu</span>
                  <Button
                    variant="neutral"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {navigationItems.map((item, index) => (
                      <div key={`${item.title}-${index}`} className="space-y-2">
                        {item.href ? (
                          <Link 
                            href={item.href} 
                            className={
                              `block w-full text-left p-3 rounded-lg transition-colors font-medium ` +
                              (isPathActive(item.href)
                                ? 'bg-muted text-primary'
                                : 'text-foreground hover:text-primary hover:bg-muted')
                            }
                            onClick={() => setOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-muted/50">
                              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                              {item.description && (
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              )}
                            </div>
                            {item.items && (
                              <div className="ml-2 space-y-1">
                                {item.items.map((subItem, subIndex) => (
                                  <Link
                                    key={`${subItem.title}-${subIndex}`}
                                    href={subItem.href}
                                    className={
                                      `block w-full text-left p-3 pl-4 rounded-md transition-colors border-l-2 border-primary/20 ` +
                                      (isPathActive(subItem.href)
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted')
                                    }
                                    onClick={() => setOpen(false)}
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-border space-y-3">
                  <Button asChild variant="neutral" className="w-full justify-start" onClick={() => setOpen(false)}>
                    <Link href="/dashboard/new-project">Submit Project</Link>
                  </Button>
                  
                  {isSignedIn ? (
                    // Signed in state
                    <>
                      <Button asChild variant="neutral" className="w-full justify-start" onClick={() => setOpen(false)}>
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                      <Button asChild variant="neutral" className="w-full justify-start" onClick={() => setOpen(false)}>
                        <Link href="/profile">Profile</Link>
                      </Button>
                      <Button
                        variant="neutral"
                        onClick={() => {
                          handleSignOut()
                          setOpen(false)
                        }}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    // Not signed in state
                    <>
                      <Button asChild variant="neutral" className="w-full justify-start" onClick={() => setOpen(false)}>
                        <Link href="/signin">Sign in</Link>
                      </Button>
                      <Button asChild variant="default" className="w-full" onClick={() => setOpen(false)}>
                        <Link href="/discord">Join Community</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header1
export { Header1 }
