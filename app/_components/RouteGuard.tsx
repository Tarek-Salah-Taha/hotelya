"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_hooks/useUser";
import { SupportedLang } from "../_types/types";
import { useLocale } from "next-intl";
import Spinner from "./Spinner";

type RouteGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

export default function RouteGuard({
  children,
  requireAuth = false,
}: RouteGuardProps) {
  const { user, loading } = useUser();
  const router = useRouter();
  const locale = useLocale() as SupportedLang;

  useEffect(() => {
    if (loading) return;

    // Redirect away from protected routes if no user
    if (requireAuth && !user) {
      router.replace(`/${locale}/auth/login`);
      return;
    }

    // Redirect away from auth routes if user exists
    if (!requireAuth && user) {
      router.replace(`/${locale}`);
      return;
    }
  }, [user, loading, requireAuth, router, locale]);

  // Show loading state while checking authentication
  if (loading) {
    return <Spinner />;
  }

  // Only render children if conditions are met
  if ((requireAuth && user) || (!requireAuth && !user)) {
    return <>{children}</>;
  }

  return null;
}
