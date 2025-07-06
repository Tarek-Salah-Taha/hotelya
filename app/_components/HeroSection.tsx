import Image from "next/image";

function HeroSection() {
  return (
    <section className="bg-background flex flex-col md:flex-row items-center p-8 gap-8 text-text">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
          Find Your Perfect Stay with Hotelya
        </h1>
        <p className="mb-4 text-lg text-gray-700">
          Discover top-rated hotels worldwide with unbeatable prices, real guest
          reviews, and instant booking confirmation — all in one easy-to-use
          platform designed to make your travel planning effortless and
          exciting.
        </p>
      </div>
      <div className="flex-1">
        <Image
          src="/hero.png"
          alt="Hotel Pool"
          className="rounded-lg shadow-md w-full max-h-[400px] object-cover"
          width={500}
          height={300}
        />
      </div>
    </section>
  );
}

export default HeroSection;
