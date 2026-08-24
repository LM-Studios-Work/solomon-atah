import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // 1. Existing logic for /media redirect
  if (req.nextUrl.pathname.startsWith('/media')) {
    return NextResponse.redirect(new URL('/solomon-atah-podcast', req.url), 308)
  }

  // 2. Auth logic for CMS
  if (
    req.nextUrl.pathname.startsWith('/newsletter/cms') ||
    (req.nextUrl.pathname.startsWith('/api/newsletters') && req.method !== 'GET') ||
    req.nextUrl.pathname.startsWith('/blog/cms') ||
    (req.nextUrl.pathname.startsWith('/api/blogs') && req.method !== 'GET')
  ) {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    const requiredPassword = process.env.CMS_PASSWORD;

    if (!requiredPassword) {
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
      }
      return new NextResponse('CMS Password not configured on server', { status: 500 });
    }

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      // Decode base64
      const [user, pwd] = atob(authValue).split(':');

      if (pwd === requiredPassword) {
        return NextResponse.next();
      }
    }

    // Prompt for HTTP Basic Auth
    url.pathname = '/api/auth';
    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure CMS Studio"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/media', '/newsletter/cms/:path*', '/api/newsletters/:path*', '/blog/cms/:path*', '/api/blogs/:path*'],
}
