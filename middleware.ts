import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // কেউ যদি /admin লিংকে যেতে চায়, তখন এটি চেক করবে
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // চেক করবে ব্রাউজারে লগিন করার কুকি (Cookie) আছে কি না
    const isLoggedIn = request.cookies.get('admin_logged_in')?.value === 'true';
    
    if (!isLoggedIn) {
      // লগিন করা না থাকলে, তাকে /login পেজে পাঠিয়ে দেবে
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};