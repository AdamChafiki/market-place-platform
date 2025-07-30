import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      navigate("/");
    },

    onError: (error: AxiosError) => {
      toast.error((error.response?.data as { message?: string })?.message);
      throw new Error("Login failed");
    },
  });
};
