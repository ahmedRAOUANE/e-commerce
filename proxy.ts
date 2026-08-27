// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Public paths - no protection
    if (path === '/' ||
        path.startsWith('/products') ||
        path.startsWith('/categories') ||
        path.startsWith('/api/auth') ||           // login, register, setup
        path.startsWith('/setup')) {
        return NextResponse.next();
    }

    // 2. Protected paths
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    // No token → Redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Admin-only routes
    const isAdminRoute = path.startsWith('/admin') || path.startsWith('/api/admin');

    if (isAdminRoute && token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};