import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // 🧠 this gives us access to React Query's cache

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post("/auth/login", credentials);
      api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      return data;
    },

    onSuccess: (data) => {
      // ✅ Save token
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ Refetch user profile
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });

      // ✅ Navigate to home
      navigate("/");
    },

    onError: (error: AxiosError) => {
      toast.error((error.response?.data as { message?: string })?.message);
    },
  });
};
