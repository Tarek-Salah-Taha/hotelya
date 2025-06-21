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

  useEffect(() => {
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

        if (profile) setUser(profile);
      }
    };

    fetchUser();
  }, []);

  return { user };
}
