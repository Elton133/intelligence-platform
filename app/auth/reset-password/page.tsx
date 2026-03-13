"use client";

import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@/lib/schemas/auth";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const resetToken = sessionStorage.getItem("resetToken");
      if (!resetToken) {
        setError("Session expired. Please start the password reset process again.");
        return;
      }

      const response = await authApi.resetPassword(data, resetToken);
      
      if (response.success) {
        // Clear session storage
        sessionStorage.removeItem("tempToken");
        sessionStorage.removeItem("resetToken");
        sessionStorage.removeItem("resetPhone");
        
        // Redirect to login
        router.push("/auth/login?reset=success");
      } else {
        setError(response.message || "Failed to reset password");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Reset access to the Infrastructure Intelligence Platform."
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
            New password
          </label>
          <input
            type="password"
            {...register("newPassword")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="Create a secure password"
          />
          {errors.newPassword && (
            <p className="text-xs text-red-400 ml-1">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-2.5 text-left">
          <label className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase ml-1">
            Confirm password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            placeholder="Repeat password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400 ml-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 px-4 py-4 rounded-full bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? "Updating..." : "Update password"}
        </button>
      </form>
    </AuthShell>
  );
}


