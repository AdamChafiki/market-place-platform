import api from "@/lib/axios";

export const getAllAnnouncements = async () => {
  const response = await api.get("/announcement/");
  return response.data;
};

export const createAnnouncement = async (formData: FormData) => {
  const response = await api.post("/announcement/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAnnouncementById = async (id: string) => {
  const response = await api.get(`/announcement/${id}`);
  return response.data.announcement;
};
