"use client";

import { useTranslations } from "next-intl";
import FooterLinkSection from "./FooterLinkSection";
import BrandingSection from "./BrandingSection";
import Copyright from "./Copyright";

function Footer() {
  const t = useTranslations("HomePage");

  const footerLinks = [
    {
      title: t("Company"),
      links: [
        { href: "/about", text: t("About Hotelya") },
        { href: "/careers", text: t("Careers at Hotelya") },
        { href: "/press", text: t("Media & Press") },
        { href: "/blog", text: t("Travel Blog") },
      ],
    },
    {
      title: t("Support"),
      links: [
        { href: "/help", text: t("Help & FAQs") },
        { href: "/contact", text: t("Contact Support") },
        { href: "/safety", text: t("Travel Safety Tips") },
        { href: "/cancellation", text: t("Cancellation Guide") },
      ],
    },
    {
      title: t("Legal"),
      links: [
        { href: "/privacy-policy", text: t("Privacy Statement") },
        { href: "/terms", text: t("Terms & Conditions") },
        { href: "/cookies", text: t("Cookie Preferences") },
        { href: "/accessibility", text: t("Accessibility Statement") },
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Branding */}
          <BrandingSection
            description={t(
              "Your trusted partner for hotel reservations worldwide"
            )}
          />

          {/* Link Sections */}
          {footerLinks.map((section, i) => (
            <FooterLinkSection key={i} {...section} />
          ))}
        </div>

        {/* Copyright */}
        <Copyright text={t("All rights reserved")} />
      </div>
    </footer>
  );
}

export default Footer;
