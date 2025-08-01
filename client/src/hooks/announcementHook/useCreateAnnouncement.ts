import { createAnnouncement } from "@/services/announcement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  const {
    mutate: createAnnoucement,
    isPending,
    error,
  } = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Announcement has been created.");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to create announcement.");
    },
  });

  return { createAnnoucement, isLoading: isPending, error };
}
