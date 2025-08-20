"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUserWithProfile } from "../_lib/usersApi";
import toast from "react-hot-toast";
import Link from "next/link";
import { SupportedLang } from "../_types/types";
import { useTranslations, useLocale } from "next-intl";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import FormError from "./FormError";

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
  const localeFromPath = useLocale() as SupportedLang;
  const locale: SupportedLang = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : "en";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t("Join Us")}
          </h1>
          <p className="text-gray-500">
            {t("Create your account to get started")}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <FormField
                id="firstName"
                name="firstName"
                type="text"
                label={t("First Name")}
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <FormField
                id="lastName"
                name="lastName"
                type="text"
                label={t("Last Name")}
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <FormField
            id="email"
            name="email"
            type="email"
            label={t("Email Address")}
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <PasswordField
            id="password"
            name="password"
            label={t("Password")}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            locale={locale}
            required
          />

          {/* Error */}
          {error && <FormError message={error} />}

          {/* Submit */}
          <SubmitButton
            loading={loading}
            t={t}
            loadingLabel="Creating account"
            defaultLabel="Register"
          />
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("Already have an account?")}{" "}
            <Link
              href={`/${locale}/auth/login`}
              className="text-primary hover:underline font-medium transition-colors"
            >
              {t("Sign In")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
