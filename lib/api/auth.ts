import { api } from "./axios";
import { 
  SignupInput, 
  LoginInput, 
  ForgotPasswordInput, 
  VerifyOtpInput, 
  ResetPasswordInput 
} from "../schemas/auth";

export const authApi = {
  signup: async (data: SignupInput) => {
    const response = await api.post("/auth/signup", {
      ...data,
      role: "User" // Default role as per swagger
    });
    return response.data;
  },

  login: async (data: LoginInput) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordInput) => {
    const response = await api.post("/auth/forgot-password", {
      phoneNumber: data.phoneNumber
    });
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpInput, tempToken: string) => {
    const response = await api.post("/auth/forgot-password/verify-otp", data, {
      headers: {
        Authorization: `Bearer ${tempToken}`
      }
    });
    return response.data;
  },

  resetPassword: async (data: ResetPasswordInput, resetToken: string) => {
    const response = await api.put("/auth/password/reset", {
      newPassword: data.newPassword
    }, {
      headers: {
        Authorization: `Bearer ${resetToken}`
      }
    });
    return response.data;
  },

  resendOtp: async (phoneNumber: string) => {
    const response = await api.post("/auth/forgot-password/otp/resend", {
      phoneNumber
    });
    return response.data;
  }
};
