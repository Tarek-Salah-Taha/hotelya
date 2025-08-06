"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useUser } from "../_hooks/useUser";
import toast from "react-hot-toast";
import {
  fetchUserProfile,
  updateUserProfileById,
  uploadUserAvatar,
} from "../_lib/usersApi";
import { FormValues } from "../_types/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Profile() {
  const { user, loading } = useUser();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { register, setValue, handleSubmit, watch } = useForm<FormValues>();

  const t = useTranslations("ProfilePage");

  const form = watch();

  // Load profile data
  useEffect(() => {
    if (!user?.id) return;

    const loadProfile = async () => {
      const data = await fetchUserProfile(user.id);

      if (data) {
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

        setAvatarUrl(data.avatarUrl || "");
      }
    };

    loadProfile();
  }, [user?.id, user?.email, setValue]);

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setIsUploading(true);

    try {
      const uploadedUrl = await uploadUserAvatar(file);

      if (uploadedUrl && typeof uploadedUrl === "string") {
        setAvatarUrl(uploadedUrl);
        setValue("avatarUrl", uploadedUrl);
        toast.success(t("Avatar uploaded successfully!"));
      } else {
        toast.error(t("Failed to upload avatar"));
      }
    } catch (error) {
      console.error("Error uploading avatar", error);
      toast.error(t("Error uploading avatar"));
    } finally {
      setIsUploading(false);
    }
  };

  // Submit form
  const onSubmit = async (data: FormValues) => {
    if (!user?.id) return;

    const safeData = {
      ...data,
      avatarUrl,
      dateOfBirth: data.dateOfBirth || undefined,
    };

    try {
      const { error } = await updateUserProfileById(user.id, safeData);

      if (error) {
        console.error("❌ Update failed:", error);
        toast.error(t("Failed to update profile"));
      } else {
        toast.success(t("Profile updated successfully!"));
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      toast.error(t("Error updating profile"));
    }
  };

  const getProgress = () => {
    const checks = [
      !!form.email,
      !!form.mobile,
      !!form.firstName &&
        !!form.lastName &&
        !!form.gender &&
        !!form.city &&
        !!form.country &&
        !!form.dateOfBirth,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 text-4xl flex items-center justify-center"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={t("User avatar")}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-gray-600 font-bold">
                {form.firstName?.[0]}
                {form.lastName?.[0]}
              </span>
            )}
          </motion.div>

          <motion.h2
            className="mt-4 text-xl font-bold text-gray-800"
            whileHover={{ scale: 1.01 }}
          >
            {form.firstName} {form.lastName}
          </motion.h2>
          <p className="text-sm text-gray-500 mt-1">
            {form.city} • {form.country}
          </p>

          <div className="mt-6 space-y-3 text-left">
            <ProfileStatus label={t("Verified Email")} valid={!!form.email} />
            <ProfileStatus
              label={t("Verified Mobile Number")}
              valid={!!form.mobile}
            />
            <ProfileStatus
              label={t("Complete Basic Info")}
              valid={
                !!form.firstName &&
                !!form.lastName &&
                !!form.gender &&
                !!form.city &&
                !!form.country &&
                !!form.dateOfBirth
              }
            />
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-1">
              {t("Profile Completion")}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-gradient-to-r from-primary to-primary-dark h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {getProgress()}% {t("complete")}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 text-gray-800">
            {t("Personal Information")}
          </h3>

          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-white shadow-md"
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={t("User Avatar")}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-full h-full flex items-center justify-center text-xl font-bold text-gray-600">
                  {form.firstName?.[0]}
                  {form.lastName?.[0]}
                </div>
              )}
            </motion.div>
            <motion.button
              disabled={isUploading}
              onClick={() => avatarInputRef.current?.click()}
              className="text-sm bg-gradient-to-r bg-primary text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {t("Uploading")}
                </span>
              ) : (
                t("Change Avatar")
              )}
            </motion.button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <InputField label={t("First Name")} {...register("firstName")} />
            <InputField label={t("Last Name")} {...register("lastName")} />
            <InputField
              label={t("Email")}
              type="email"
              disabled
              className="bg-gray-50 text-gray-500 cursor-not-allowed"
              {...register("email")}
            />
            <InputField
              label={t("Mobile")}
              type="tel"
              {...register("mobile")}
            />
            <InputField
              label={t("Date of Birth")}
              type="date"
              {...register("dateOfBirth")}
            />
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {t("Gender")}
              </label>
              <select
                {...register("gender")}
                className="border border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              >
                <option value="">{t("Select Gender")}</option>
                <option value="Male">{t("Male")}</option>
                <option value="Female">{t("Female")}</option>
                <option value="Other">{t("Prefer not to say")}</option>
              </select>
            </div>
            <InputField label={t("City")} {...register("city")} />
            <InputField label={t("Country")} {...register("country")} />

            <motion.button
              type="submit"
              disabled={isUploading}
              className="bg-gradient-to-r bg-primary text-white py-3 rounded-lg shadow-sm hover:shadow-md transition-all md:col-span-2 font-medium"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("Save Changes")}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Reusable Components
function InputField({
  label,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...rest}
        className={`border border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          className ?? ""
        }`}
      />
    </motion.div>
  );
}

function ProfileStatus({ label, valid }: { label: string; valid: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
      whileHover={{ x: 3 }}
    >
      <span
        className={`text-lg ${valid ? "text-green-500" : "text-yellow-500"}`}
      >
        {valid ? "✓" : "!"}
      </span>
      <span className="text-sm text-gray-600">{label}</span>
    </motion.div>
  );
}
