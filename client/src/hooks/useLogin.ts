import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useLogin = () =>
  useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post("/auth/login", credentials);
      api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      return data;
    },

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
    },

    onError: (error: AxiosError) => {
      toast.error((error.response?.data as { message?: string })?.message);
    },
  });
