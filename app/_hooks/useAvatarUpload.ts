"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  updateUserAvatar,
  uploadUserAvatar,
  cacheUserData,
} from "../_lib/usersApi";
import { UseFormSetValue } from "react-hook-form";
import { FormValues } from "../_types/types";
import { useTranslations } from "next-intl";
import { useUserContext } from "../_context/UserContext";

export function useAvatarUpload(
  userId: string | undefined,
  setValue: UseFormSetValue<FormValues>
) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user, setUser } = useUserContext();
  const t = useTranslations("ProfilePage");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setIsUploading(true);
    try {
      // 1. Upload file to storage
      const publicUrl = await uploadUserAvatar(file);

      // 2. Save URL to user profile
      const uploadedUrl = await updateUserAvatar(userId, publicUrl);

      if (uploadedUrl && typeof uploadedUrl === "string") {
        setAvatarUrl(uploadedUrl);
        setValue("avatarUrl", uploadedUrl);

        // Update user context with new avatar URL
        if (user) {
          const updatedUser = { ...user, avatarUrl: uploadedUrl };
          setUser(updatedUser);
          cacheUserData(updatedUser);
        }

        toast.success(t("Avatar uploaded successfully!"));
      } else {
        toast.error(t("Failed to upload avatar"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("Error uploading avatar"));
    } finally {
      setIsUploading(false);
    }
  };

  return { avatarUrl, handleAvatarChange, isUploading };
}
