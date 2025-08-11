"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect, useCallback } from "react";
import supabase from "../_lib/supabase";

export function useUser() {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(!user);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: profile } = await supabase
        .from("users")
        .select("id, email, firstName, lastName, avatarUrl")
        .eq("id", session.user.id)
        .single();

      setUser(profile || null);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [setUser]);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  return { user, loading };
}
