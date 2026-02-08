import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const authorized = request.cookies.get('tpn_admin')?.value === 'authorized';
  if (!authorized) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
