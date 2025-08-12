"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect, useCallback, useMemo } from "react";
import supabase from "../_lib/supabase";
import { UserProfile } from "../_types/types";

const STORAGE_KEY = "app_user";

export function useUser(initialUser?: UserProfile | null) {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(
    user === undefined && initialUser === undefined
  );

  // Memoize the cached user to prevent unnecessary recalculations
  const cachedUser = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      return cached ? (JSON.parse(cached) as UserProfile) : null;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, [user]); // Recalculate only when user changes

  // Fetch user from DB
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
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
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

    // 1. Load from initialUser (SSR) if provided
    if (initialUser !== undefined && user === undefined) {
      setUser(initialUser);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialUser));
      setLoading(false);
      return;
    }

    // 2. Use memoized cached user if available
    if (!user && cachedUser) {
      setUser(cachedUser);
      setLoading(false);
      return;
    }

    // 3. Check Supabase session only if no user in memory
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

    // 4. Auth state changes
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
  }, [fetchUser, initialUser, user, setUser, cachedUser]);

  return { user, loading };
}
