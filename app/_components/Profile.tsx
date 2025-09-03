"use client";

import { motion } from "framer-motion";
import Spinner from "./Spinner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileForm from "./ProfileForm";
import { useUser } from "../_hooks/useUser";
import { useAvatarUpload } from "../_hooks/useAvatarUpload";
import { useProfileForm } from "../_hooks/useProfileForm";

export default function Profile() {
  const { user, loading } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    onSubmit,
    form,
    profileChecks,
    getProgress,
    isLoadingProfile,
  } = useProfileForm(user);

  const { avatarUrl, handleAvatarChange, isUploading } = useAvatarUpload(
    user?.id,
    setValue
  );

  if (loading || !user || isLoadingProfile) return <Spinner />;

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileSidebar
          avatarUrl={form.avatarUrl}
          form={form}
          profileChecks={profileChecks}
          progress={getProgress()}
        />

        <ProfileForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={(data) => onSubmit({ ...data, avatarUrl })}
          avatarUrl={form.avatarUrl}
          handleAvatarChange={handleAvatarChange}
          isUploading={isUploading}
        />
      </div>
    </motion.div>
  );
}
