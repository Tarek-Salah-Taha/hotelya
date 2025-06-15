import CallToAction from "@/app/_components/CallToAction";
import Destinations from "@/app/_components/Destinations";
import Features from "@/app/_components/Features";
import Footer from "@/app/_components/Footer";
import HeroSection from "@/app/_components/HeroSection";
import SearchBox from "@/app/_components/SearchBox";
import Testimonials from "@/app/_components/Testimonials";

export default function Page() {
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
