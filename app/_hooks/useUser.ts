"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect, useCallback } from "react";
import supabase from "../_lib/supabase";
import { UserProfile } from "../_types/types";

export function useUser(initialUser?: UserProfile | null) {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(
    user === undefined && initialUser === undefined
  );

  useEffect(() => {
    if (initialUser !== undefined && user === undefined) {
      setUser(initialUser);
      setLoading(false);
    }
  }, [initialUser, user, setUser]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUser(null);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("id, email, firstName, lastName, avatarUrl")
        .eq("id", authUser.id)
        .single();

      if (profileError) throw profileError;

      setUser(profile);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    let mounted = true;

    if (initialUser !== undefined) {
      setUser(initialUser);
      setLoading(false);
      return;
    }

    // Check session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }

      fetchUser();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (!mounted) return;

      if (event === "SIGNED_IN") {
        await fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchUser, initialUser, setUser]);

  return { user, loading };
}
