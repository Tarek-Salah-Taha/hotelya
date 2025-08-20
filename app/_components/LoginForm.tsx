"use client";

import { SupportedLang } from "../_types/types";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import FormError from "./FormError";
import SubmitButton from "./SubmitButton";

type LoginFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  form: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  error: string;
  loading: boolean;
  locale: SupportedLang;
  t: (key: string) => string;
};

export default function LoginForm({
  onSubmit,
  form,
  onChange,
  showPassword,
  onTogglePassword,
  error,
  loading,
  locale,
  t,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormField
        id="email"
        name="email"
        type="email"
        label={t("Email Address")}
        placeholder="your@email.com"
        value={form.email}
        onChange={onChange}
        required
      />

      <PasswordField
        id="password"
        name="password"
        label={t("Password")}
        placeholder="••••••••"
        value={form.password}
        onChange={onChange}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        locale={locale}
        required
      />

      {error && <FormError message={error} />}

      <SubmitButton
        loading={loading}
        t={t}
        loadingLabel="Signing in"
        defaultLabel="Sign In"
      />
    </form>
  );
}
