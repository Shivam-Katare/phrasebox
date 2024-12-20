import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/user(.*)'])
const isPublicRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  
  if (userId && req.nextUrl.pathname === '/') {
    const protectedUrl = new URL('/user/dashboard', req.url)
    return NextResponse.redirect(protectedUrl)
  }

  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})
