// src/api/axiosInstance.js
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // 백엔드 주소 맞게 수정
    withCredentials: true, // 세션 쿠키 사용 시 필요
});