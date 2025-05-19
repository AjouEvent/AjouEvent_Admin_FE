// src/api/member.js
import { axiosInstance } from "./axiosInstance";

// 1. 멤버 목록 조회
export const fetchMembersByRole = async () =>
    axiosInstance.get(`/admin/members`);
    // axiosInstance.get(`/admin/members?role=${role}`);

// 2. 역할 변경
export const updateMemberRole = async (id, role) =>
    axiosInstance.patch(`/admin/members/${id}/role`, { role });

// 3. 권한 부여
export const grantPermission = async (id, permission) =>
    axiosInstance.post(`/admin/members/${id}/permissions`, { permission });

// 4. 권한 회수
export const revokePermission = async (id, permission) =>
    axiosInstance.delete(`/admin/members/${id}/permissions`, {
        data: { permission },
    });
