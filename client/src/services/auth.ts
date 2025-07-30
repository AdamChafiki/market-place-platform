import api from "@/lib/axios";
import type { RegisterInterface } from "@/types";

export const registerUser = async (data: RegisterInterface) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  try {
    api.defaults.headers.common.Authorization = "";
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Logout failed");
  }
};
