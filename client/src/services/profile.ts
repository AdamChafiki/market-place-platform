import api from "@/lib/axios";
import type { UpdateProfileInterface } from "@/types";

export const fetchProfile = async () => {
  const token = localStorage.getItem("accessToken");
  console.log("Fetching profile with token:", token);

  if (!token) {
    throw new Error("No access token found");
  }
  const { data } = await api.get("/profile/me");
  return data.user;
};

export const updateProfileService = async (data: UpdateProfileInterface) => {
  console.log("Updating profile with data:", data);
  const { data: response } = await api.put("/profile/", data);
  return response.user;
};
