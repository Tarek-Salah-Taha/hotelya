"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUserWithProfile } from "../_lib/usersApi";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { SupportedLang } from "../_types/types";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const supportedLocales: SupportedLang[] = ["en", "ar", "fr", "de", "es", "it"];

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations("RegisterPage");

  const pathname = usePathname();
  const localeFromPath = pathname.split("/")[1] as SupportedLang;
  const locale: SupportedLang = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : "en";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, error } = await signUpUserWithProfile(form);

      if (error) {
        setError(error);
        toast.error(error);
        return;
      }

      if (user) {
        toast.success(`${t("Welcome")} ${form.firstName}!`);
        router.push(`/${locale}/auth/login`);
      }
    } catch (err) {
      console.error(err);
      toast.error(t("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {t("Join Us")}
          </motion.h1>
          <p className="text-gray-500">
            {t("Create your account to get started")}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("First Name")}
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="John"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("Last Name")}
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("Email Address")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={form.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("Password")}
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10 transition-all"
              value={form.password}
              onChange={handleChange}
              required
            />
            <motion.span
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute ${
                locale === "ar" ? "left" : "right"
              }-3 top-[42px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </motion.span>
          </motion.div>

          {error && (
            <motion.p
              className="text-red-500 text-sm p-2 bg-red-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r bg-primary  text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  {t("Creating account")}
                </>
              ) : (
                t("Register")
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            {t("Already have an account?")}{" "}
            <Link
              href={`/${locale}/auth/login`}
              className="text-primary hover:underline font-medium transition-colors"
            >
              {t("Sign In")}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
