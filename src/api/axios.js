import axios from 'axios';
const BASE_URL = import.meta.env.API_BASE_URL;

const instance = axios.create({
    baseURL: BASE_URL, // 백엔드 서버 URL
    timeout: 10000,
    withCredentials: true, // 쿠키 포함 설정
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;