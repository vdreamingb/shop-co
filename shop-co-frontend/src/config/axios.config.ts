import axios from "axios";

const api = axios.create({
  baseURL: "https://shop-co-botr.onrender.com/api/",
  timeout: 10000,
  withCredentials: true,
});

export default api;
