import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="bg-background flex flex-col md:flex-row items-center p-8 gap-8 text-text">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="mb-4">
          Discover amazing hotels worldwide with the best prices and instant
          booking confirmation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/hotels">
            <button className="bg-primary text-white px-4 py-2 rounded">
              🔍 Search Hotels
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <Image
          src="/hotel.webp"
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
