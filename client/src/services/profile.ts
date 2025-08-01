import api from "@/lib/axios";

export const fetchProfile = async () => {
  const token = localStorage.getItem("accessToken");
  console.log("Fetching profile with token:", token);

  if (!token) {
    throw new Error("No access token found");
  }
  const { data } = await api.get("/profile/me");
  return data.user;
};
