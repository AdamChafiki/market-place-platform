import { getAnnouncementById } from "@/services/announcement";
import { useQuery } from "@tanstack/react-query";

export const useAnnouncementById = (id: string) =>
  useQuery({
    queryKey: ["announcements", id],
    queryFn: getAnnouncementById.bind(null, id),
    enabled: !!id,
  });
