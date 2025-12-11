import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

// Validate access token in middleware
function validateAccessToken(token: string): boolean {
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const parts = decoded.split(':');

        if (parts.length !== 3) return false;

        const [username, timestamp, signature] = parts;
        const payload = `${username}:${timestamp}`;
        const secret = process.env.AUTH_SECRET || 'portfolio-admin-secret-key';
        const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

        // Check signature
        if (signature !== expectedSignature) return false;

        // Check if token is expired (24 hours)
        const tokenTime = parseInt(timestamp);
        const now = Date.now();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (now - tokenTime > maxAge) return false;

        return true;
    } catch {
        return false;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (pathname.startsWith('/admin')) {
        const session = request.cookies.get('admin_session');

        // Check if token exists and is valid
        if (!session?.value || !validateAccessToken(session.value)) {
            // Redirect to login page
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);

            // Clear invalid cookie
            const response = NextResponse.redirect(loginUrl);
            if (session?.value && !validateAccessToken(session.value)) {
                response.cookies.delete('admin_session');
            }

            return response;
        }
    }

    // If user is logged in and tries to access login page, redirect to admin
    if (pathname === '/login') {
        const session = request.cookies.get('admin_session');
        if (session?.value && validateAccessToken(session.value)) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
