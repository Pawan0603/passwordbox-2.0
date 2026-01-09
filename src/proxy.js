import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request) {
  let cookies = request.cookies.get('PasswordBoxToken');
  if (cookies && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register') || request.nextUrl.pathname.startsWith('/forgot-password') || request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!cookies && (request.nextUrl.pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    '/login/:path*',
    '/register/:path*',
    '/forgot-password/:path*',
    '/dashboard/:path*',
    '/dashboard',
  ],
}