"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaXTwitter />, href: "https://x.com" },
  { icon: <FaInstagram />, href: "https://instagram.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
];

function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socialLinks.map(({ icon, href }, i) => (
        <motion.a
          key={i}
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
  );
}

export default SocialLinks;
