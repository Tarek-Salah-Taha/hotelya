"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect } from "react";
import supabase from "../_lib/supabase";
import { UserProfile } from "../_types/types";

const STORAGE_KEY = "app_user";

export function useUser(initialUser?: UserProfile | null | undefined) {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(user === undefined);

  useEffect(() => {
    // 1️⃣ If SSR provided a user (even null), use it and cache it
    if (initialUser !== undefined && user === undefined) {
      setUser(initialUser);
      if (initialUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUser));
      }
      setLoading(false);
      return;
    }

    // 2️⃣ If SSR did not provide a user → try cache
    if (initialUser === undefined && !user) {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setUser(JSON.parse(cached));
        setLoading(false);
        return;
      }
    }

    // 3️⃣ If no user yet → confirm with Supabase client
    if (!user) {
      supabase.auth.getUser().then(async ({ data: auth }) => {
        if (!auth.user) {
          setUser(null);
          localStorage.removeItem(STORAGE_KEY);
          setLoading(false);
          return;
        }
        const { data } = await supabase
          .from("users")
          .select("id, email, firstName, lastName, avatarUrl")
          .eq("id", auth.user.id)
          .single();
        setUser(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [initialUser, user, setUser]);

  return { user, loading };
}
