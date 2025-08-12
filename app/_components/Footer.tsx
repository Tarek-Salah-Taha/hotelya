"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaXTwitter />, href: "https://x.com" },
  { icon: <FaInstagram />, href: "https://instagram.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
];

function Footer() {
  const t = useTranslations("HomePage");
  return (
    <footer className="bg-dark text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Branding */}
          <motion.div className="space-y-6">
            <h3 className="text-2xl font-bold">Hotelya</h3>
            <p className="text-background/80">
              {t("Your trusted partner for hotel reservations worldwide")}
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/appstore.png"
                  alt="Download on the App Store"
                  width={135}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </motion.a>
              <motion.a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div>
            <h4 className="text-lg font-semibold mb-4">{t("Company")}</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", text: t("About Hotelya") },
                { href: "/careers", text: t("Careers at Hotelya") },
                { href: "/press", text: t("Media & Press") },
                { href: "/blog", text: t("Travel Blog") },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-background/80 hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div>
            <h4 className="text-lg font-semibold mb-4">{t("Support")}</h4>
            <ul className="space-y-3">
              {[
                { href: "/help", text: t("Help & FAQs") },
                { href: "/contact", text: t("Contact Support") },
                { href: "/safety", text: t("Travel Safety Tips") },
                { href: "/cancellation", text: t("Cancellation Guide") },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-background/80 hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div>
            <h4 className="text-lg font-semibold mb-4">{t("Legal")}</h4>
            <ul className="space-y-3">
              {[
                { href: "/privacy-policy", text: t("Privacy Statement") },
                { href: "/terms", text: t("Terms & Conditions") },
                { href: "/cookies", text: t("Cookie Preferences") },
                { href: "/accessibility", text: t("Accessibility Statement") },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-background/80 hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div className="border-t border-primary/20 mt-12 pt-8 text-center">
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} Hotelya, Inc.{" "}
            {t("All rights reserved")}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
