"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect, useCallback } from "react";
import supabase from "../_lib/supabase";
import { UserProfile } from "../_types/types";

const STORAGE_KEY = "app_user"; // 👈 change if you want a different key

export function useUser(initialUser?: UserProfile | null) {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(
    user === undefined && initialUser === undefined
  );

  // ✅ Fetch user from DB
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUser(null);
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("id, email, firstName, lastName, avatarUrl")
        .eq("id", authUser.id)
        .single();

      if (profileError) throw profileError;

      setUser(profile);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); // ✅ cache user
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    let mounted = true;

    // ✅ 1. Load from initialUser (SSR) if provided
    if (initialUser !== undefined && user === undefined) {
      setUser(initialUser);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialUser));
      setLoading(false);
      return;
    }

    // ✅ 2. Load from sessionStorage if available
    if (!user) {
      const cachedUser = sessionStorage.getItem(STORAGE_KEY);
      if (cachedUser) {
        try {
          const parsed = JSON.parse(cachedUser) as UserProfile;
          setUser(parsed);
          setLoading(false);
        } catch {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    // ✅ 3. Check Supabase session only if no user in memory
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

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

    // ✅ 4. Auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" && !user) {
        await fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        sessionStorage.removeItem(STORAGE_KEY);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchUser, initialUser, user, setUser]);

  return { user, loading };
}
