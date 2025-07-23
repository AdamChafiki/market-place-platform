import api from "@/lib/axios";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterInput) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
