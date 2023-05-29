// middleware.ts
import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log('request.nextUrl', request.url);
    const { os } = userAgent(request)

    const redirectFromFacebook = request.nextUrl.search.includes('fbclid')

    if (redirectFromFacebook || os.name === "Android") {
        const requestHeaders = request.url;
        const textHost = request.nextUrl.origin
        const replaceCode = requestHeaders?.replace(textHost, "")
        const replaceStrNew = '/news/';
        const replaceCodeNew = replaceCode?.replace(replaceStrNew, "")
        return NextResponse.redirect(new URL(`https://archeodiscovery.net/${replaceCodeNew}`))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: new RegExp('/\*/g')
}