import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import {
  forgotPasswordRequest,
  loginRequest,
  resetPasswordRequest,
  verifyOtpRequest,
} from "@/lib/api/auth.api";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (response) => {
      setAuth(response.data, response.token);
      toast.success(response.message || "Login successful");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "Login failed");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordRequest,

    onSuccess: (response) => {
      toast.success(response.message || "Reset link sent to your email");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "Email verification failed");
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtpRequest,

    onSuccess: (response) => {
      toast.success(response.message || "OTP verified successfully");
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "OTP verification failed");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordRequest,

    onSuccess: (response) => {
      toast.success(
        response.message || "Password reset successfully! Please login",
      );
    },

    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Something went wrong";

      toast.error(message || "Reset failed");
    },
  });
};
