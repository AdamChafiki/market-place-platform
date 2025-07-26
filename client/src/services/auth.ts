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
  const { data } = await api.get("/auth/profile");
  return data.user;
};

export const testApi = async () => {
  const { data } = await axios.get("http://localhost:8000/tesst");
  return data;
};
