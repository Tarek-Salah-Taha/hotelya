import { FormValues, LoginData, RegisterData } from "../_types/types";
import supabase from "./supabase";

export async function registerUser({
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

export async function loginUser({ email, password }: LoginData) {
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

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function getUserProfile(userId: string) {
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

export async function updateUserProfile(
  userId: string,
  data: Partial<FormValues>
) {
  const { error } = await supabase.from("users").update(data).eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function uploadAvatar(file: File): Promise<string> {
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
