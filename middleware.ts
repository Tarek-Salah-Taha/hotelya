// // /middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./app/_lib/i18nConfig";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Skip static assets and API routes
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/favicon.ico") ||
//     pathname.startsWith("/fonts") ||
//     pathname.startsWith("/images")
//   ) {
//     return NextResponse.next();
//   }

//   // Check if path starts with a supported locale
//   const hasLangPrefix = SUPPORTED_LANGUAGES.some((locale) =>
//     pathname.startsWith(`/${locale}`)
//   );

//   if (!hasLangPrefix) {
//     const acceptLang = request.headers.get("accept-language");
//     const browserLang =
//       acceptLang?.split(",")[0].split("-")[0].toLowerCase() ?? DEFAULT_LANGUAGE;

//     const matchedLang = SUPPORTED_LANGUAGES.includes(browserLang)
//       ? browserLang
//       : DEFAULT_LANGUAGE;

//     const url = request.nextUrl.clone();
//     url.pathname =
//       pathname === "/"
//         ? `/${matchedLang}`
//         : `/${matchedLang}${pathname.replace(/\/+$/, "")}`;

//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/:path*"],
// };

// /middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./app/_lib/i18nConfig";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and API routes (added file extension check)
  const isStaticAsset =
    pathname.match(/\.(.*)$/) ||
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
    const acceptLang = request.headers.get("accept-language");
    const browserLang =
      acceptLang?.split(",")[0].split("-")[0].toLowerCase() ?? DEFAULT_LANGUAGE;

    const matchedLang = SUPPORTED_LANGUAGES.includes(browserLang)
      ? browserLang
      : DEFAULT_LANGUAGE;

    const url = request.nextUrl.clone();
    url.pathname =
      pathname === "/"
        ? `/${matchedLang}`
        : `/${matchedLang}${pathname.replace(/\/+$/, "")}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Updated matcher to exclude static files based on extensions
export const config = {
  matcher: [
    // Run middleware on everything *except* files with an extension
    "/((?!_next|api|fonts|images|favicon.ico|.*\\..*).*)",
  ],
};
