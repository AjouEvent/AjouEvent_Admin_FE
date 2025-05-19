// src/api/auth.js
import axios from "axios"

export async function signup({ email, password, userNickname }) {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/signup", {
            email,
            password,
            userNickname,
        })
        return response.data // { id: 1 }
    } catch (error) {
        // 명세상 400 응답은 error.response.data.message 포함
        const msg = error?.response?.data?.message || "회원가입 실패"
        throw new Error(msg)
    }
}

export async function login({ email, password }) {
    return axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
    })
}

export async function logout() {
    return axios.post("http://localhost:8080/api/admin/logout", {},{
        withCredentials: true
    })
}
