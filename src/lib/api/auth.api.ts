import { publicApi } from "./axios";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const res = await publicApi.post("/auth/signin", data);
  return res.data;
};

export const forgotPasswordRequest = async (email: string) => {
  const res = await publicApi.post("/auth/forgot-password", { email });
  return res.data;
};

export const verifyOtpRequest = async (data: { otp: string }) => {
  const res = await publicApi.post("/auth/verify-reset-otp", data);
  return res.data;
};

export const resetPasswordRequest = async (data: {
  user_id: string;
  password: string;
  password_confirmation: string;
}) => {
  const res = await publicApi.post("/auth/reset-password", data);
  return res.data;
};
