"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../_lib/usersApi";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { user, error } = await registerUser(form);

    if (user) toast.success(`Welcome ${form.firstName}!`);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    router.push("/auth/login");
  };

  return (
    <div className="max-w-md mx-auto mt-2 bg-white shadow-md rounded-xl p-6 text-text">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="flex gap-4">
          <input
            name="firstName"
            placeholder="First name"
            className="w-1/2 p-2 border border-gray-300 rounded"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last name"
            className="w-1/2 p-2 border border-gray-300 rounded"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full p-2 border border-gray-300 rounded pr-10"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-primary font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
