import api from "@/lib/axios";
import axios from "axios";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterInput) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const fetchProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("No access token found");
  }
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  const { data } = await api.get("/profile/me");
  return data.user;
};

export const testApi = async () => {
  const { data } = await axios.get("http://localhost:8000/tesst");
  return data;
};
