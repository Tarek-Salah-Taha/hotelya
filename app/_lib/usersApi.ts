import { FormValues, LoginData, RegisterData } from "../_types/types";
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
export async function loginUserWithProfile({ email, password }: LoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const { data: profileData } = await supabase
    .from("users")
    .select("firstName")
    .eq("id", data.user.id)
    .single();

  return {
    user: data.user,
    session: data.session,
    userName: profileData?.firstName || "",
  };
}

// Signs out the currently authenticated user from the session.
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// Fetches the full profile data of a user by their ID.
export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
