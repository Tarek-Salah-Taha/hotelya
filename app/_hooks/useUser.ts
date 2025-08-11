// hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";
import supabase from "../_lib/supabase";
import { UserProfile } from "../_types/types";

export function useUser(initialUser: UserProfile | null) {
  const [user, setUser] = useState<UserProfile | null>(initialUser);

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
      setUser(profile || null);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Only fetch fresh data if initialUser wasn't provided
    if (!initialUser) fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });
    return () => listener.subscription.unsubscribe();
  }, [initialUser]);

  return { user };
}
