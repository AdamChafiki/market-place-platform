import { registerUser } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useRegister() {
  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      console.log(user);
      toast.success("User has been created.");
    },
  });

  return { signup, isLoading: isPending, error };
}
