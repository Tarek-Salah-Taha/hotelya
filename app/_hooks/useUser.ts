"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect, useCallback } from "react";
import supabase from "../_lib/supabase";
import { UserProfile } from "../_types/types";

const STORAGE_KEY = "app_user";

export function useUser(initialUser?: UserProfile | null) {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(user === undefined);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        setUser(null);
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("id, email, firstName, lastName, avatarUrl")
        .eq("id", auth.user.id)
        .single();

      setUser(data);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    // 1️⃣ SSR user from RootLayout
    if (initialUser !== undefined && user === undefined) {
      setUser(initialUser);
      if (initialUser) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialUser));
      }
      setLoading(false);
      return;
    }

    // 2️⃣ Cached user from sessionStorage
    if (!user) {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        setUser(JSON.parse(cached));
        setLoading(false);
        return;
      }
    }

    // 3️⃣ Restore Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }
      if (!user) {
        fetchUser();
      } else {
        setLoading(false);
      }
    });

    // 4️⃣ Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        sessionStorage.removeItem(STORAGE_KEY);
      }
    });

    return () => subscription.unsubscribe();
  }, [initialUser, user, setUser, fetchUser]);

  return { user, loading };
}
