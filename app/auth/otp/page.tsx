"use client";

import Link from "next/link";
import AuthShell from "@/app/components/auth/AuthShell";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema, VerifyOtpInput } from "@/lib/schemas/auth";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    }
  });

  const otpValue = watch("otp");

  useEffect(() => {
    // Get phone number from session storage for display
    const phone = sessionStorage.getItem("resetPhone");
    if (phone) setPhoneNumber(phone);
  }, []);

  const onSubmit = async (data: VerifyOtpInput) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMsg(null);
      
      const tempToken = sessionStorage.getItem("tempToken");
      if (!tempToken) {
        setError("Session expired. Please try resetting your password again.");
        return;
      }

      const response = await authApi.verifyOtp(data, tempToken);
      
      if (response.success && response.resetToken) {
        // Store reset token
        sessionStorage.setItem("resetToken", response.resetToken);
        router.push("/auth/reset-password");
      } else {
        setError(response.message || "Invalid OTP");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setError(null);
      setSuccessMsg(null);
      
      const phone = sessionStorage.getItem("resetPhone");
      if (!phone) {
        setError("Phone number not found. Please start the reset process again.");
        return;
      }

      const response = await authApi.resendOtp(phone);
      if (response.success) {
        setSuccessMsg("A new OTP has been sent to your phone.");
        if (response.tempToken) {
          sessionStorage.setItem("tempToken", response.tempToken);
        }
      } else {
        setError(response.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  // Handle individual input changes to update the main form value
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only allow 1 char
    
    const currentOtp = otpValue.split("");
    currentOtp[index] = value;
    
    // Fill empty spaces if needed
    for (let i = 0; i < 5; i++) {
      if (!currentOtp[i]) currentOtp[i] = " ";
    }
    
    const newOtp = currentOtp.join("").replace(/\s/g, "");
    setValue("otp", newOtp, { shouldValidate: newOtp.length === 5 });

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <AuthShell
      title="Enter verification code"
      subtitle={`We've sent a 5-digit code to ${phoneNumber || 'your phone'}. Enter it below to continue.`}
      footer={
        <>
          Didn't receive a code?{" "}
          <button type="button" onClick={handleResend} className="text-white/80 underline-offset-4 hover:underline">
            Resend
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl">
            {successMsg}
          </div>
        )}

        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpValue[i] || ""}
              onChange={(e) => handleInputChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 md:w-14 md:h-16 rounded-2xl border border-white/10 bg-white/[0.03] text-center text-xl md:text-2xl font-light text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:ring-4 focus:ring-white/[0.02] transition-all"
            />
          ))}
        </div>
        {errors.otp && (
          <p className="text-xs text-red-400 text-center">{errors.otp.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || otpValue.length !== 5}
          className="w-full mt-4 px-4 py-4 rounded-full bg-white text-black text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? "Verifying..." : "Verify code"}
        </button>

        <p className="text-[11px] text-white/40 text-center font-light leading-relaxed">
          This helps keep access to infrastructure data secure for your organisation.
        </p>
      </form>
    </AuthShell>
  );
}


