import api from "@/lib/axios";

export const fetchProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("No access token found");
  }
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  const { data } = await api.get("/profile/me");
  return data.user;
};
