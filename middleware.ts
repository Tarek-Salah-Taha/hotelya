// // /middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./app/_lib/i18nConfig";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and API routes (added file extension check)
  const isStaticAsset =
    pathname.match(/\.(.*?)$/) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico");

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Check if path starts with a supported locale
  const hasLangPrefix = SUPPORTED_LANGUAGES.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!hasLangPrefix) {
    // Always redirect to default language for root path
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = `/${DEFAULT_LANGUAGE}`;
      return NextResponse.redirect(url);
    }

    // For other paths, try to use browser language
    const acceptLang = request.headers.get("accept-language");
    const browserLang =
      acceptLang?.split(",")[0].split("-")[0].toLowerCase() ?? DEFAULT_LANGUAGE;

    const matchedLang = SUPPORTED_LANGUAGES.includes(browserLang)
      ? browserLang
      : DEFAULT_LANGUAGE;

    const url = request.nextUrl.clone();
    url.pathname = `/${matchedLang}${pathname.replace(/\/+$/, "")}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Updated matcher to exclude static files based on extensions
export const config = {
  matcher: [
    // Run middleware on everything *except* files with an extension
    "/((?!_next|api|auth|fonts|images|favicon.ico|.*\\..*).*)",
  ],
};

// // middleware.ts
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextRequest, NextResponse } from "next/server";
// import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./app/_lib/i18nConfig";

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   // This attaches the user's session to the request
//   const supabase = createMiddlewareClient(
//     { req: request, res: response },
//     {
//       supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     }
//   );
//   await supabase.auth.getSession();

//   const { pathname } = request.nextUrl;

//   // Your locale logic (unchanged)
//   const isStaticAsset =
//     pathname.match(/\.(.*?)$/) ||
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/fonts") ||
//     pathname.startsWith("/images") ||
//     pathname.startsWith("/favicon.ico");

//   if (isStaticAsset) {
//     return response;
//   }

//   const hasLangPrefix = SUPPORTED_LANGUAGES.some((locale) =>
//     pathname.startsWith(`/${locale}`)
//   );

//   if (!hasLangPrefix) {
//     if (pathname === "/") {
//       const url = request.nextUrl.clone();
//       url.pathname = `/${DEFAULT_LANGUAGE}`;
//       return NextResponse.redirect(url);
//     }

//     const acceptLang = request.headers.get("accept-language");
//     const browserLang =
//       acceptLang?.split(",")[0].split("-")[0].toLowerCase() ?? DEFAULT_LANGUAGE;

//     const matchedLang = SUPPORTED_LANGUAGES.includes(browserLang)
//       ? browserLang
//       : DEFAULT_LANGUAGE;

//     const url = request.nextUrl.clone();
//     url.pathname = `/${matchedLang}${pathname.replace(/\/+$/, "")}`;

//     return NextResponse.redirect(url);
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/((?!_next|api|fonts|images|favicon.ico|.*\\..*).*)"],
// };
