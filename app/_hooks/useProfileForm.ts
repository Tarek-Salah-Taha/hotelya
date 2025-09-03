"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  fetchUserProfile,
  updateUserProfileById,
  cacheUserData,
} from "../_lib/usersApi";
import toast from "react-hot-toast";
import { FormValues, UserProfile } from "../_types/types";
import { useUserContext } from "../_context/UserContext";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function useProfileForm(user: UserProfile | null | undefined) {
  const { register, setValue, handleSubmit, watch, formState } =
    useForm<FormValues>();
  const t = useTranslations("ProfilePage");
  const { setUser } = useUserContext();
  const router = useRouter();
  const locale = useLocale();
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const form = watch();

  // Load profile
  useEffect(() => {
    if (!user?.id) {
      setIsLoadingProfile(false);
      return;
    }

    const loadProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const data = await fetchUserProfile(user.id);
        if (!data) return;

        const fields: (keyof FormValues)[] = [
          "firstName",
          "lastName",
          "email",
          "mobile",
          "dateOfBirth",
          "gender",
          "city",
          "country",
          "avatarUrl",
        ];

        fields.forEach((field) => {
          const value =
            field === "email"
              ? data[field] || user?.email || ""
              : data[field] || (field === "dateOfBirth" ? null : "");
          setValue(field, value);
        });
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, [user?.id, user?.email, setValue]);

  // Submit
  const onSubmit = async (data: FormValues) => {
    if (!user?.id) return;

    const safeData = {
      ...data,
      dateOfBirth: data.dateOfBirth || undefined,
    };

    try {
      const { error } = await updateUserProfileById(user.id, safeData);
      if (error) {
        toast.error(t("Failed to update profile"));
      } else {
        // Update user context with new profile data
        const updatedUser = { ...user, ...safeData };
        setUser(updatedUser);
        cacheUserData(updatedUser);

        toast.success(t("Profile updated successfully!"));

        // Redirect to home page after successful save
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 1000); // Small delay to show the success message
      }
    } catch {
      toast.error(t("Error updating profile"));
    }
  };

  const profileChecks = [
    { label: t("Verified Email"), valid: !!form.email },
    { label: t("Verified Mobile Number"), valid: !!form.mobile },
    {
      label: t("Complete Basic Info"),
      valid:
        !!form.firstName &&
        !!form.lastName &&
        !!form.gender &&
        !!form.city &&
        !!form.country &&
        !!form.dateOfBirth,
    },
  ];

  const getProgress = () =>
    Math.round(
      (profileChecks.filter((c) => c.valid).length / profileChecks.length) * 100
    );

  return {
    form,
    register,
    setValue,
    handleSubmit,
    onSubmit,
    profileChecks,
    getProgress,
    formState,
    isLoadingProfile,
  };
}
