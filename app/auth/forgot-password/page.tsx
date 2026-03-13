"use client";

import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/schemas/auth";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authApi.forgotPassword(data);
      
      if (response.success && response.tempToken) {
        // Store temp token in session storage to use in OTP page
        sessionStorage.setItem("tempToken", response.tempToken);
        sessionStorage.setItem("resetPhone", data.phoneNumber);
        router.push("/auth/otp");
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your phone number and we'll send a secure OTP to reset your password."
      footer={
        <>
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-white/80 underline-offset-4 hover:underline">
            Back to sign in
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
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="e.g. 05087812456"
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-400 ml-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 px-4 py-4 rounded-full bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </AuthShell>
  );
}


