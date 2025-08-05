import { updateProfileService } from "@/services/profile";
import type { UpdateProfileInterface } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: UpdateProfileInterface) => updateProfileService(data),

    onSuccess: () => {
      toast.success("Profile has been updated.");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to update announcement.");
    },
  });

  return { updateProfile, isLoading: isPending, error };
}
