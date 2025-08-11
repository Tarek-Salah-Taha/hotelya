import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ToasterProvider } from "../_components/ToasterProvider";
import Header from "../_components/Header";
import { Cairo } from "next/font/google";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotelya - Find Your Perfect Stay",
  description:
    "Discover amazing hotels worldwide with the best prices and instant booking confirmation.",
  icons: {
    icon: "/favicon.png",
  },
};

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" },
    { locale: "fr" },
    { locale: "de" },
    { locale: "es" },
    { locale: "it" },
  ];
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let userProfile = null;

  if (session?.user) {
    const { data } = await supabase
      .from("users")
      .select("id, email, firstName, lastName, avatarUrl")
      .eq("id", session.user.id)
      .single();
    userProfile = data;
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.className}  antialiased bg-background`}>
        <NextIntlClientProvider>
          <ToasterProvider />
          <Header initialUser={userProfile} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
