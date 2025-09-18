import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (pathname.startsWith("/admin")) {
		const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
		const role = (token as any)?.role;
		if (!token || role !== "admin") {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};

