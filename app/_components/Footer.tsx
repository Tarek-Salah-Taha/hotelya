"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaXTwitter />, href: "https://x.com" },
  { icon: <FaInstagram />, href: "https://instagram.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
];

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-text text-white py-10 px-4 md:px-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-xl font-bold mb-2">Hotelya</h3>
          <p>
            Your trusted partner for hotel reservations worldwide. Book with
            confidence.
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            {socialLinks.map(({ icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="p-2 rounded-full bg-white text-text hover:bg-secondary hover:text-white transition-colors"
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* App Store Buttons */}
          <div className="flex gap-3 mt-6">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 hover:shadow-lg"
            >
              <Image
                src="/appstore.png"
                alt="Download on the App Store"
                width={200}
                height={50}
              />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 hover:shadow-lg"
            >
              <Image
                src="/playstore.png"
                alt="Get it on Google Play"
                width={200}
                height={50}
              />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/about">About Hotelya</Link>
            </li>
            <li>
              <Link href="/careers">Careers at Hotelya</Link>
            </li>
            <li>
              <Link href="/press">Media & Press</Link>
            </li>
            <li>
              <Link href="/blog">Travel Blog</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-2">Support</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/help">Help & FAQs</Link>
            </li>
            <li>
              <Link href="/contact">Contact Support</Link>
            </li>
            <li>
              <Link href="/safety">Travel Safety Tips</Link>
            </li>
            <li>
              <Link href="/cancellation">Cancellation Guide</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/privacy-policy">Privacy Statement</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie Preferences</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility Statement</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-10 text-sm">
        © {new Date().getFullYear()} Hotelya, Inc. All rights reserved.
      </p>
    </motion.footer>
  );
}

export default Footer;
