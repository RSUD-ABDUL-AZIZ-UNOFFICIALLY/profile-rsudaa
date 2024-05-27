'use server'
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('access_token')

    if (!cookie) {
        return NextResponse.redirect(new URL("/login-admin", request.url))
    }
}

export const config = {
    matcher: "/admin-rsaa",
}