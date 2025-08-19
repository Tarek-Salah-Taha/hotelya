import { motion } from "framer-motion";
import { SupportedLang } from "../_types/types";
import Link from "next/link";

export default function LoginFooter({
  locale,
  t,
}: {
  locale: SupportedLang;
  t: (key: string) => string;
}) {
  return (
    <motion.div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        {t("Don't have an account?")}{" "}
        <Link
          href={`/${locale}/auth/register`}
          className="text-primary hover:underline font-medium transition-colors"
        >
          {t("Create one")}
        </Link>
      </p>
    </motion.div>
  );
}
