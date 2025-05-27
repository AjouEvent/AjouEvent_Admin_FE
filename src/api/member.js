// src/api/member.js
import { adminAxios } from "./adminAxios.js";

// 1. 멤버 목록 조회
export const fetchMembersByRole = async () =>
    adminAxios.get(`/members`);
    // axiosInstance.get(`/admin/members?role=${role}`);

// 2. 역할 변경
export const updateMemberRole = async (id, role) =>
    adminAxios.patch(`/members/${id}/role`, { role });

// 3. 권한 부여
export const grantPermission = async (id, permission) =>
    adminAxios.post(`/members/${id}/permissions`, { permission });

// 4. 권한 회수
export const revokePermission = async (id, permission) =>
    adminAxios.delete(`/members/${id}/permissions`, {
        data: { permission },
    });