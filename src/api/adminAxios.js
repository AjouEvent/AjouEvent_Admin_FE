import axios from "axios";

export const adminAxios = axios.create({
    baseURL: "http://localhost:8080/api/admin",
});

adminAxios.interceptors.request.use((config) => {
    const sessionId = sessionStorage.getItem("JSESSIONID");
    if (sessionId) {
        config.headers["X-Session-Id"] = sessionId;
    }
    return config;
});
