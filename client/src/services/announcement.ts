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
