import { api } from "./axios";

export interface UserProfile {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  isAccountDeleted: boolean;
}

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get("/user/profile");
    return response.data.data;
  }
};
