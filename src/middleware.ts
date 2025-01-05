import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('Running middleware');
    console.log('Cookies:', request.cookies);

    const jwt = request.cookies.get('student-s-cookie');  // Access the cookie
    const path = request.nextUrl.pathname;  // Current page path
    console.log('JWT:', jwt);

    // If no JWT is found and user is not on the login page, redirect to login
    if (!jwt && path !== '/account') {
        console.log('No JWT found, redirecting to /account');
        return NextResponse.redirect(new URL('/account', request.url));
    }

    // If JWT exists and user is on the login page, redirect to /
    if (jwt && path === '/account') {
        console.log('JWT found, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow the request to continue if no redirects are needed
    return NextResponse.next();
}

// Adjusted config to apply middleware to both the root and project routes
export const config = {
    matcher: ['/', '/settings:path*','/account/profile','/posts:path*','/search:path*'], // The correct matcher pattern
};
