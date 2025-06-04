// src/api/member.js
import { adminAxios } from "./adminAxios.js";

export const fetchAllMembers = async () =>
    adminAxios.get(`/members`);

export const fetchMembersByRole = async (role) =>
    adminAxios.get(`/members?role=${role}`);

export const fetchMemberNonBlacklist = async () =>
    adminAxios.get(`/members/non-blacklisted`);

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