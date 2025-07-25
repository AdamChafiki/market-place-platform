import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useLogin = () =>
  useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post("/auth/login", credentials);
      api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      return data;
    },
  });
