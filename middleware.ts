import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes yang butuh authentication
const isProtectedRoute = createRouteMatcher([
  '/home(.*)',
  '/companions(.*)',
  '/my-journey(.*)',
  // Tambahkan route lain yang perlu protection
])

// Define public routes yang bisa diakses tanpa login
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Tambahkan public routes lainnya
])

export default clerkMiddleware(async (auth, req) => {
  // Jika route protected, cek authentication
  if (isProtectedRoute(req)) {
    const { userId } = await auth()
    
    if (!userId) {
      // Redirect ke landing page jika belum login
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  
  // Jika sudah login tapi akses public route, redirect ke home
  if (isPublicRoute(req)) {
    const { userId } = await auth()
    
    if (userId && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}