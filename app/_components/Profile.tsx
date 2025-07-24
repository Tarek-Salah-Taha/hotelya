"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import supabase from "../_lib/supabase";
import { useUser } from "../_hooks/useUser";
import toast from "react-hot-toast";
import { updateUserProfile, uploadAvatar } from "../_lib/usersApi";
import { FormValues } from "../_types/types";

export default function Profile() {
  const { user, loading } = useUser();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { register, setValue, handleSubmit, watch } = useForm<FormValues>();

  const form = watch();

  // Load profile data
  useEffect(() => {
    if (!user?.id) return;

    const loadProfile = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

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

    const uploadedUrl = await uploadAvatar(file);

    if (uploadedUrl && typeof uploadedUrl === "string") {
      setAvatarUrl(uploadedUrl);
      setValue("avatarUrl", uploadedUrl);
      toast.success("Avatar uploaded successfully!");
    } else {
      toast.error("Failed to upload avatar");
    }

    setIsUploading(false);
  };

  // Submit form
  const onSubmit = async (data: FormValues) => {
    if (!user?.id) return;

    // Fix: Convert empty string or null date to undefined
    const safeData = {
      ...data,
      avatarUrl,
      dateOfBirth: data.dateOfBirth || undefined,
    };

    const { error } = await updateUserProfile(user.id, safeData);

    console.log("Data being submitted:", data);

    if (error) {
      console.error("❌ Update failed:", error);
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
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
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />; // Or any loading UI
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200 text-4xl flex items-center justify-center">
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
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            {form.firstName} {form.lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {form.city}, {form.country}
          </p>

          <div className="mt-6 space-y-3 text-left">
            <ProfileStatus label="Verified Email" valid={!!form.email} />
            <ProfileStatus
              label="Verified Mobile Number"
              valid={!!form.mobile}
            />
            <ProfileStatus
              label="Complete Basic Info"
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
            <p className="text-sm text-gray-500">Complete Your Profile</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Personal Information
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-xl font-bold text-gray-600">
                  {form.firstName?.[0]}
                  {form.lastName?.[0]}
                </div>
              )}
            </div>
            <button
              disabled={isUploading}
              onClick={() => avatarInputRef.current?.click()}
              className="text-sm bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md"
            >
              {isUploading ? "Uploading..." : "Change"}
            </button>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <InputField label="First Name" {...register("firstName")} />
            <InputField label="Last Name" {...register("lastName")} />
            <InputField
              label="Email"
              type="email"
              disabled
              className="bg-gray-100 text-gray-500 cursor-not-allowed"
              {...register("email")}
            />

            <InputField label="Mobile" type="tel" {...register("mobile")} />
            <InputField
              label="Date of Birth"
              type="date"
              {...register("dateOfBirth")}
            />
            <div>
              <label className="block mb-1 text-sm font-medium">Gender</label>
              <select
                {...register("gender")}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <InputField label="City" {...register("city")} />
            <InputField label="Country" {...register("country")} />

            <button
              type="submit"
              disabled={isUploading}
              className="bg-primary text-white py-2 rounded-lg hover:bg-blue-700 md:col-span-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
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
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <input
        {...rest}
        className={`border rounded-lg p-3 w-full ${className ?? ""}`}
      />
    </div>
  );
}

function ProfileStatus({ label, valid }: { label: string; valid: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-lg ${valid ? "text-green-500" : "text-yellow-500"}`}
      >
        {valid ? "✔" : "❗"}
      </span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
