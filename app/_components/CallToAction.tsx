"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function CallToAction() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-primary pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background pattern */}
      <motion.div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-primary"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text content */}
        <motion.div className="space-y-6">
          <motion.h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Find Your Perfect Stay —<br />
            <motion.span className="text-secondary">
              Anytime, Anywhere
            </motion.span>
          </motion.h2>

          <motion.p className="text-lg text-white/90 max-w-lg">
            Explore thousands of hotels worldwide with exclusive mobile deals.
            Join over 2 million travelers who book smarter with Hotelya.
          </motion.p>

          <motion.div>
            <Link href={`${locale}/hotels`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Search Hotels
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div className="relative">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <Image
              src="/travel.png"
              alt="Happy travelers using Hotelya"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CallToAction;
