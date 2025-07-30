import axios from "axios";

let accessToken = ""; // in-memory

export const setAccessToken = (token: string) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // IMPORTANT: send cookies (refresh token)
});

// Add token to every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh token if access token expires
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        console.log(data);

        accessToken = data.accessToken;
        setAccessToken(accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
