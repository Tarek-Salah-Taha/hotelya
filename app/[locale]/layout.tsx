import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ToasterProvider } from "../_components/ToasterProvider";
import Header from "../_components/Header";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <NextIntlClientProvider>
          <ToasterProvider />
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
