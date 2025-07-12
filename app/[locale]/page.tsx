import { notFound } from "next/navigation";
import CallToAction from "../_components/CallToAction";
import Destinations from "../_components/Destinations";
import Features from "../_components/Features";
import Footer from "../_components/Footer";
import HeroSection from "../_components/HeroSection";
import SearchBox from "../_components/SearchBox";
import Testimonials from "../_components/Testimonials";
import { SupportedLang } from "../_types/types";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: SupportedLang }>;
}) {
  const supportedLocales: SupportedLang[] = [
    "en",
    "ar",
    "fr",
    "de",
    "es",
    "it",
  ];

  const { locale } = await params;

  if (!supportedLocales.includes(locale as SupportedLang)) {
    notFound();
  }

  return (
    <>
      <HeroSection />
      <SearchBox />
      <Features />
      <Destinations />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
