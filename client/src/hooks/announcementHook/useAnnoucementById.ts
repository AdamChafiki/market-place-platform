import { getAnnouncementById } from "@/services/announcement";
import { useQuery } from "@tanstack/react-query";

export const useAnnouncementById = (id: string) =>
  useQuery({
    queryKey: ["announcement", id],
    queryFn: getAnnouncementById.bind(null, id),
    enabled: !!id,
  });
