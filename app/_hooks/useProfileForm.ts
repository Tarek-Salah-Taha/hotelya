"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { fetchUserProfile, updateUserProfileById } from "../_lib/usersApi";
import toast from "react-hot-toast";
import { FormValues, UserProfile } from "../_types/types";

export function useProfileForm(user: UserProfile | null | undefined) {
  const { register, setValue, handleSubmit, watch, formState } =
    useForm<FormValues>();
  const t = useTranslations("ProfilePage");

  const form = watch();

  // Load profile
  useEffect(() => {
    if (!user?.id) return;

    const loadProfile = async () => {
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
        toast.success(t("Profile updated successfully!"));
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
  };
}
