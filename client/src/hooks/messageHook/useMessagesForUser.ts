import { getMessagesForUser } from "@/services/message";
import { useQuery } from "@tanstack/react-query";

export default function useMessagesForUser() {
  return useQuery({
    queryKey: ["messagesForUser"],
    queryFn: getMessagesForUser,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
