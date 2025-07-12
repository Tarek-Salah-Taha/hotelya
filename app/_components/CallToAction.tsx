"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function CallToAction() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  return (
    <section className="bg-primary text-white pt-10 px-4 md:px-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-10 text-center md:text-left">
        {/* Left: Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Find Your Perfect Stay — Anytime, Anywhere
          </h2>
          <p className="text-lg mb-6">
            Explore thousands of hotels worldwide with exclusive mobile deals.
            Join over 2 million travelers who book smarter with Hotelya.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href={`${locale}/hotels`}>
              <button className="bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
                Search Hotels
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Responsive Image */}
        <div className="block">
          <Image
            src="/travel.png"
            alt="Travel illustration"
            width={400}
            height={400}
            className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
