import { useMutation } from "@tanstack/react-query";
import { createMessage } from "@/services/message";
import { toast } from "sonner";

export default function useCreateMessage() {
  const {
    mutate: sendMessage,
    isPending,
    error,
  } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      toast.success("Message sent!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to send message.");
    },
  });

  return { sendMessage, isLoading: isPending, error };
}
