import { type NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/session';

const publicRoutes = ['/auth'];

export default async function middleware(req: NextRequest) {
  const nextResponse = NextResponse.next();
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // 3. 세션 검증
  const { isAuth } = await verifySession(nextResponse);
  if (!isAuth && !isPublicRoute) {
    nextResponse.cookies.delete('seesion');
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  if (isAuth && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return nextResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
