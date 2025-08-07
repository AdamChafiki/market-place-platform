import { updateAnnouncement } from "@/services/announcement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateAnnouncement() {
  const queryClient = useQueryClient();

  const {
    mutate: updateAnnoucement,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateAnnouncement(id, formData),

    onSuccess: (data) => {
      toast.success("Announcement has been updated.");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      queryClient.invalidateQueries({
        queryKey: ["announcement", data.announcement?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["announcements-by-user-id"],
      });
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to update announcement.");
    },
  });

  return { updateAnnoucement, isLoading: isPending, error };
}
