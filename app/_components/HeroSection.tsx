import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-text leading-tight">
            Find Your Perfect Stay with{" "}
            <span className="text-primary">Hotelya</span>
          </h1>
          <p className="text-lg text-text opacity-90">
            Discover top-rated hotels worldwide with unbeatable prices, real
            guest reviews, and instant booking confirmation — all in one
            easy-to-use platform designed to make your travel planning
            effortless and exciting.
          </p>
          <Link
            href="/hotels"
            className="inline-block bg-primary hover:bg-dark text-white px-8 py-3 rounded-lg font-medium transition duration-300"
          >
            Book Now
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/hero.png"
              alt="Luxury hotel with pool"
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent md:from-transparent md:via-transparent/70 md:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
