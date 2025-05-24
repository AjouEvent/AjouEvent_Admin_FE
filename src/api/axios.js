import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버 URL
  timeout: 10000,
  withCredentials: true, // 쿠키 포함 설정
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance; 