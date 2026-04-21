import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

function getProjectRef(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return url.match(/https:\/\/([^.]+)\./)?.[1] ?? '';
}

function injectTokenFromHeader(request: NextRequest): void {
  const token = request.headers.get('x-sb-token');
  if (!token) return;
  const hasCookie = request.cookies.getAll().some((c) => c.name.includes('auth-token'));
  if (hasCookie) return;
  request.cookies.set(`sb-${getProjectRef()}-auth-token`, token);
}

export async function middleware(request: NextRequest) {
  injectTokenFromHeader(request);
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

  const pathname = request.nextUrl.pathname;

  // Public routes — accessible without auth
  const publicPaths = ['/', '/professional-landing-page', '/login', '/user-registration', '/auth'];
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));

  // Protected routes — require authentication
  const protectedPaths = ['/personal-dashboard', '/meal-planning', '/consultation-booking', '/admin-portal'];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Admin-only route protection
  if (user && (pathname === '/admin-portal' || pathname.startsWith('/admin-portal/'))) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'institution_admin';
    if (!isAdmin) {
      const url = request.nextUrl.clone();
      url.pathname = '/personal-dashboard';
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from login/register
  if (user && (pathname === '/login' || pathname === '/user-registration')) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role || 'individual';
    const isAdmin = role === 'admin' || role === 'institution_admin';
    const url = request.nextUrl.clone();
    url.pathname = isAdmin ? '/admin-portal' : '/personal-dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
