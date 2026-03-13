"use client";

import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/lib/schemas/auth";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authApi.signup(data);
      
      if (response.success) {
        // Redirect to login after successful signup
        router.push("/auth/login?registered=true");
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Set up access to infrastructure pipelines, projects, and market dashboards."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white/80 underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-2.5 text-left">
          <label className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase ml-1">
            Full name
          </label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="Your name"
          />
          {errors.fullName && (
            <p className="text-xs text-red-400 ml-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2.5 text-left">
          <label className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase ml-1">
            Work email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="you@institution.org"
          />
          {errors.email && (
            <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2.5 text-left">
          <label className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="e.g. 0205345678"
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-400 ml-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2.5 text-left">
          <label className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase ml-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="Create a secure password"
          />
          {errors.password && (
            <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 px-4 py-4 rounded-full bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}


