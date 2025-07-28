import { fetchProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () =>
  useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchProfile,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
