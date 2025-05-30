import { adminAxios } from "./adminAxios.js";

// 블랙리스트 전체 조회
export const fetchBlacklist = async () =>
    adminAxios.get("/members/blacklist");

// 블랙리스트 등록
export const addToBlacklist = async (memberId, reason) =>
    adminAxios.post(`/members/${memberId}/blacklist`, { reason });

// 블랙리스트 해제
export const removeFromBlacklist = async (memberId) =>
    adminAxios.delete(`/members/${memberId}/blacklist`);
