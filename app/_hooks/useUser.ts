// hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";
import supabase from "../_lib/supabase";

export function useUser() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true); // ✅ Add loading

  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: profile } = await supabase
        .from("users")
        .select("id, email, firstName, lastName, avatarUrl")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUser(profile);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();

    // ✅ Listen for auth changes (login, logout, token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
