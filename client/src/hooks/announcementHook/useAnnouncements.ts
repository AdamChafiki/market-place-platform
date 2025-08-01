import { getAllAnnouncements } from "@/services/announcement";
import { useQuery } from "@tanstack/react-query";

export const useAnnouncements = () =>
  useQuery({
    queryKey: ["announcements"],
    queryFn: getAllAnnouncements,
    staleTime: 1000 * 60 * 5,
  });
