"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ProfileStatus from "./ProfileStatus";
import { FormValues } from "../_types/types";
import { useTranslations } from "next-intl";

type SidebarProps = {
  avatarUrl: string | undefined;
  form: FormValues;
  profileChecks: { label: string; valid: boolean }[];
  progress: number;
};

export default function ProfileSidebar({
  avatarUrl,
  form,
  profileChecks,
  progress,
}: SidebarProps) {
  const t = useTranslations("ProfilePage");

  return (
    <motion.div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 text-4xl flex items-center justify-center"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="User avatar"
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
        {profileChecks.map((c) => (
          <ProfileStatus key={c.label} label={c.label} valid={c.valid} />
        ))}
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-1"> {t("Profile Completion")}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-primary to-primary-dark h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {progress}% {t("complete")}
        </p>
      </div>
    </motion.div>
  );
}
