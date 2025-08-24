"use client";

import { useUserContext } from "../_context/UserContext";
import { useState, useEffect } from "react";
import { UserProfile } from "../_types/types";
import {
  getCurrentUserWithProfile,
  getCachedUserData,
  cacheUserData,
  clearCachedUserData,
  validateCachedUserData,
  setupAuthStateListener,
} from "../_lib/usersApi";

export function useUser(initialUser?: UserProfile | null | undefined) {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(user === undefined);

  // Function to manually clear user data
  const clearUserData = () => {
    setUser(null);
    clearCachedUserData();
    setLoading(false);
  };

  // Function to validate and refresh user data
  const validateUserData = async () => {
    try {
      if (user === undefined) {
        return false;
      }
      const isValid = await validateCachedUserData(user);
      if (!isValid) {
        clearUserData();
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error validating user data:", error);
      clearUserData();
      return false;
    }
  };

  useEffect(() => {
    // 1️⃣ If SSR provided a user (even null), use it and cache it
    if (initialUser !== undefined && user === undefined) {
      setUser(initialUser);
      if (initialUser) {
        cacheUserData(initialUser);
      } else {
        clearCachedUserData();
      }
      setLoading(false);
      return;
    }

    // 2️⃣ If SSR did not provide a user → try cache
    if (initialUser === undefined && !user) {
      const cached = getCachedUserData();
      if (cached) {
        setUser(cached);
        setLoading(false);
        return;
      }
    }

    // 3️⃣ If no user yet → confirm with API
    if (!user) {
      getCurrentUserWithProfile().then((userData) => {
        if (userData) {
          setUser(userData);
          cacheUserData(userData);
        } else {
          setUser(null);
          clearCachedUserData();
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [initialUser, user, setUser]);

  // 4️⃣ Listen to auth state changes (login/logout)
  useEffect(() => {
    const subscription = setupAuthStateListener(
      // onSignOut
      () => {
        setUser(null);
        clearCachedUserData();
        setLoading(false);
      },
      // onSignIn
      (userData) => {
        setUser(userData);
        cacheUserData(userData);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, [setUser]);

  return { user, loading, clearUserData, validateUserData };
}
