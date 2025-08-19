"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type FooterLink = { href: string; text: string };
type Props = { title: string; links: FooterLink[] };

function FooterLinkSection({ title, links }: Props) {
  return (
    <motion.div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map(({ href, text }, i) => (
          <motion.li
            key={i}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={href}
              className="text-background/80 hover:text-white transition-colors"
            >
              {text}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default FooterLinkSection;
