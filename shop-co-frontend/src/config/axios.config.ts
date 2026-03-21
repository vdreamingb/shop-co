import { authService } from "@/services/auth.service";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1110/api/",
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(null);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ❗ if no response → just reject
    if (!error.response) {
      return Promise.reject(error);
    }

    // ✅ ONLY handle 401
    if (error.response.status === 401 && !originalRequest._retry) {
      // ❗ prevent infinite loop
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await authService.refresh();

        processQueue(null);

        return api(originalRequest); // retry once
      } catch (err) {
        processQueue(err);

        // ❗ HARD STOP (no more retries)
        window.location.href = "/";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
