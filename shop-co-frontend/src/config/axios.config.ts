import axios from "axios";

const api = axios.create({
    baseURL: "https://shop-co-pi-nine.vercel.app/api/",
    timeout: 10000,
    withCredentials: true,
})

export default api;