// src/api/member.js
import { adminAxios } from "./adminAxios.js";

export const fetchAllMembers = async () => {
    return await adminAxios.get(`/members`);
}


export const fetchMembersByRole = async (role) =>
    adminAxios.get(`/members?role=${role}`);

export const fetchMemberNonBlacklist = async () =>
    adminAxios.get(`/members/non-blacklisted`);

export const updateMemberRole = async (id, role) =>
    adminAxios.patch(`/members/${id}/role`, { role });

export const updateMemberPermission = async (id, permissions) => {
    const res = await adminAxios.put(`/members/${id}/permissions`, { permissions });
    return res.data;
};