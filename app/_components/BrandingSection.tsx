"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

const appStoreLinks = [
  {
    href: "https://apps.apple.com",
    src: "/appstore.png",
    alt: "Download on the App Store",
  },
  {
    href: "https://play.google.com/store",
    src: "/playstore.png",
    alt: "Get it on Google Play",
  },
];

function BrandingSection({ description }: { description: string }) {
  return (
    <motion.div className="space-y-6">
      <h3 className="text-2xl font-bold">Hotelya</h3>
      <p className="text-background/80">{description}</p>

      {/* Social Media */}
      <SocialLinks />

      {/* App Store Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {appStoreLinks.map(({ href, src, alt }, i) => (
          <motion.a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={src}
              alt={alt}
              width={135}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default BrandingSection;
