import { getAllAnnouncementsByUserId } from "@/services/announcement";
import { useQuery } from "@tanstack/react-query";

export const useAnnoucementByUserId = () =>
  useQuery({
    queryKey: ["announcements-by-user-id"],
    queryFn: getAllAnnouncementsByUserId,
    staleTime: 1000 * 60 * 5,
  });


