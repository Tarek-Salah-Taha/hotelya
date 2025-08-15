"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

function CallToAction() {
  const locale = useLocale() as SupportedLang;

  const t = useTranslations("HomePage");

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-primary pt-14 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background pattern */}
      <motion.div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-primary"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text content */}
        <motion.div className="space-y-6">
          <motion.h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t("Find your perfect stay")} —{" "}
            <motion.span className="text-secondary">
              {t("Anytime, Anywhere")}
            </motion.span>
          </motion.h2>

          <motion.p className="text-lg text-white/90 max-w-lg">
            {t("Explore thousands of hotels worldwide")}
          </motion.p>

          <motion.div>
            <Link href={`${locale}/hotels`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
              >
                {t("search hotels")}
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
              priority
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CallToAction;
