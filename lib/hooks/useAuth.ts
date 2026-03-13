import useSWR from "swr";
import { userApi } from "../api/user";
import Cookies from "js-cookie";

export function useAuth() {
  const token = Cookies.get("accessToken");
  
  const { data: user, error, isLoading, mutate } = useSWR(
    token ? "/user/profile" : null,
    userApi.getProfile,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const logout = () => {
    Cookies.remove("accessToken");
    mutate(undefined, false);
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  return {
    user,
    isLoading,
    isError: error,
    isAuthenticated: !!user,
    logout,
    mutate
  };
}
