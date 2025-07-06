import CallToAction from "./_components/CallToAction";
import Destinations from "./_components/Destinations";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import SearchBox from "./_components/SearchBox";
import Testimonials from "./_components/Testimonials";

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
