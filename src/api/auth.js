// src/api/auth.js
import axios from "axios"
import { adminAxios} from "@/api/adminAxios.js";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function signup({ email, password, userNickname }) {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
            email,
            password,
            userNickname,
        })
        return response.data
    } catch (error) {
        // 명세상 400 응답은 error.response.data.message 포함
        const msg = error?.response?.data?.message || "회원가입 실패"
        throw new Error(msg)
    }
}

export async function login({ email, password }) {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
    });
    const sessionId = res.headers["x-session-id"];
    if (sessionId) {
        sessionStorage.setItem("JSESSIONID", sessionId);
    } else {
        console.warn("세션 ID가 응답 헤더에 안 들어있음!");
    }

    return res;
}


export async function logout() {
    try {
        await adminAxios.post("/logout");
        sessionStorage.removeItem("JSESSIONID");
    } catch (err) {
        console.error("로그아웃 실패", err);
        throw err;
    }
}