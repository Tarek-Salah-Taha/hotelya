import { FormValues, RegisterData } from "../_types/types";
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear any client-side user data
    if (typeof window !== "undefined") {
      localStorage.removeItem("supabaseUser");
    }

    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
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
