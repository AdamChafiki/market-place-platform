import axios from "axios";

let accessToken = localStorage.getItem("accessToken");

export const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("accessToken", token);
};

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

if (accessToken) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

api.interceptors.request.use((config) => {
  console.log("from axios", accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        setAccessToken(data.accessToken);

        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken("");
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
