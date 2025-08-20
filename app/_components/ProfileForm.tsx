"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import InputField from "./InputField";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormValues } from "../_types/types";
import { useTranslations } from "next-intl";

type ProfileFormProps = {
  avatarUrl: string | undefined;
  isUploading: boolean;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => Promise<void>;
};

export default function ProfileForm({
  avatarUrl,
  isUploading,
  handleAvatarChange,
  register,
  handleSubmit,
  onSubmit,
}: ProfileFormProps) {
  const t = useTranslations("ProfilePage");

  return (
    <motion.div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 text-gray-800">
        {t("Personal Information")}
      </h3>

      {/* Avatar upload */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-white shadow-md"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="User Avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-full h-full flex items-center justify-center text-xl font-bold text-gray-600">
              ?
            </div>
          )}
        </motion.div>
        <motion.label
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="text-sm bg-gradient-to-r bg-primary text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          {isUploading ? t("Uploading") : t("Change Avatar")}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </motion.label>
      </div>

      {/* Form */}
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
          {...register("email")}
        />
        <InputField label={t("Mobile")} type="tel" {...register("mobile")} />
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
            className="border border-gray-200 rounded-lg p-3 w-full"
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
  );
}
