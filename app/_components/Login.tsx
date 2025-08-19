"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import toast from "react-hot-toast";
import { loginUserWithProfile } from "../_lib/usersApi";
import { useUserContext } from "../_context/UserContext";
import { SupportedLang } from "../_types/types";
import LoginContainer from "./LoginContainer";
import LoginCard from "./LoginCard";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

const supportedLocales: SupportedLang[] = ["en", "ar", "fr", "de", "es", "it"];

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const t = useTranslations("SigninPage");
  const { setUser } = useUserContext();
  const localeFromPath = useLocale() as SupportedLang;
  const locale: SupportedLang = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : "en";

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, error, userName } = await loginUserWithProfile(form);

      if (error) {
        setError(error);
        toast.error(error);
        return;
      }

      if (user) {
        setUser(user);
        router.push(`/${locale}`);
        toast.success(`${t("Welcome back")} ${userName}!`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader
          title={t("Welcome!")}
          subtitle={t("Sign in to your account")}
        />

        <LoginForm
          onSubmit={handleSubmit}
          form={form}
          onChange={handleChange}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          error={error}
          loading={loading}
          locale={locale}
          t={t}
        />

        <LoginFooter locale={locale} t={t} />
      </LoginCard>
    </LoginContainer>
  );
}
