import { FormValues, RegisterData, UserProfile } from "../_types/types";
import supabase from "./supabase";

// Registers a new user and saves their profile info in the database.
export async function signUpUserWithProfile({
  email,
  password,
  firstName,
  lastName,
}: RegisterData) {
  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || "Signup failed" };
  }

  const userId = authData.user.id;

  // 2. Insert profile data into 'users' table
  const { error: dbError } = await supabase.from("users").insert([
    {
      id: userId,
      firstName,
      lastName,
      email,
    },
  ]);

  if (dbError) {
    return { error: dbError.message };
  }

  return { user: authData.user };
}

// Logs in a user with email and password, and fetches their first name from the profile.
export async function loginUserWithProfile({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };
  if (!data?.user) return { error: "Login failed" };

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, email, firstName, lastName, avatarUrl")
    .eq("id", data.user.id)
    .single();

  if (profileError) return { error: profileError.message };

  return {
    user: profile,
    userName: profile.firstName || profile.email,
    error: null,
  };
}

// Signs out the currently authenticated user from the session.
export async function signOutUser() {
  try {
    // Clear client-side user data first
    if (typeof window !== "undefined") {
      clearCachedUserData(); // Use the new function
      localStorage.removeItem("supabaseUser");
      sessionStorage.removeItem("app_user");
      // Clear any other potential user-related storage
      localStorage.removeItem("user_preferences");
      localStorage.removeItem("user_settings");
    }

    // Then sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    // Even if Supabase logout fails, we should still clear local data
    if (typeof window !== "undefined") {
      clearCachedUserData(); // Use the new function
      localStorage.removeItem("supabaseUser");
      sessionStorage.removeItem("app_user");
      localStorage.removeItem("user_preferences");
      localStorage.removeItem("user_settings");
    }
    return { error: error instanceof Error ? error.message : "Logout failed" };
  }
}

// Fetches the full profile data of a user by their ID.
export async function fetchUserProfile(userId: string) {
  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!error && profile) {
    sessionStorage.setItem("app_user", JSON.stringify(profile));
  }

  return profile;
}

// Updates the user's profile in the database using their ID.
export async function updateUserProfileById(
  userId: string,
  data: Partial<FormValues>
) {
  const { error } = await supabase.from("users").update(data).eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// Uploads a user avatar to Supabase storage and returns the public URL.
export async function uploadUserAvatar(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload avatar");
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function updateUserAvatar(userId: string, avatarUrl: string) {
  const { error } = await supabase
    .from("users")
    .update({ avatarUrl })
    .eq("id", userId);

  if (error) {
    console.error("Update avatar error:", error);
    throw new Error("Failed to update avatar");
  }

  return avatarUrl;
}

// Utility function to clear all user-related data from storage
export function clearAllUserData() {
  if (typeof window !== "undefined") {
    // Clear the main user cache
    clearCachedUserData();

    const keysToRemove = ["supabaseUser", "user_preferences", "user_settings"];

    keysToRemove.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
      if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
      }
    });

    // Clear any other user-related keys that might exist
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("user_") ||
        key.includes("auth") ||
        key.includes("session")
      ) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Get current authenticated user from Supabase
export async function getCurrentAuthUser() {
  try {
    const { data: auth, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting auth user:", error);
      return null;
    }
    return auth.user;
  } catch (error) {
    console.error("Error getting auth user:", error);
    return null;
  }
}

// Fetch user profile from database by user ID
export async function fetchUserProfileById(userId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, firstName, lastName, avatarUrl")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// Get current user with profile (combines auth + profile)
export async function getCurrentUserWithProfile() {
  try {
    const authUser = await getCurrentAuthUser();
    if (!authUser) {
      return null;
    }

    const profile = await fetchUserProfileById(authUser.id);
    if (!profile) {
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Error getting current user with profile:", error);
    return null;
  }
}

// Set up auth state change listener
export function setupAuthStateListener(
  onSignOut: () => void,
  onSignIn: (user: UserProfile) => void
) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      onSignOut();
    } else if (event === "SIGNED_IN" && session?.user) {
      const profile = await fetchUserProfileById(session.user.id);
      if (profile) {
        onSignIn(profile);
      }
    }
  });

  return subscription;
}

// Cache user data to localStorage
export function cacheUserData(user: UserProfile) {
  if (typeof window !== "undefined" && user) {
    localStorage.setItem("app_user", JSON.stringify(user));
  }
}

// Get cached user data from localStorage
export function getCachedUserData(): UserProfile | null {
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem("app_user");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        console.error("Error parsing cached user data:", error);
        localStorage.removeItem("app_user");
        return null;
      }
    }
  }
  return null;
}

// Clear cached user data
export function clearCachedUserData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("app_user");
  }
}

// Validate if cached user data is still valid
export async function validateCachedUserData(
  cachedUser: UserProfile | null
): Promise<boolean> {
  try {
    const authUser = await getCurrentAuthUser();
    if (!authUser) {
      return false;
    }

    // Check if cached user ID matches current auth user ID
    if (cachedUser && cachedUser.id !== authUser.id) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating cached user data:", error);
    return false;
  }
}
