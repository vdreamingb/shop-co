import axios from "axios";

const api = axios.create({
  baseURL: "https://shop-co-botr.onrender.com/api/",
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) return Promise.reject(error);

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        isRefreshing = false;
        return api(originalRequest);
      } catch (e) {
        isRefreshing = false;
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
