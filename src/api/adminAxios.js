import axios from "axios";
const BASE_URL = import.meta.env.API_BASE_URL;

export const adminAxios = axios.create({
    baseURL: `${BASE_URL}/api/admin`,
});

adminAxios.interceptors.request.use((config) => {
    const sessionId = sessionStorage.getItem("JSESSIONID");
    if (sessionId) {
        config.headers["X-Session-Id"] = sessionId;
    }
    return config;
});
