import { adminAxios } from "./adminAxios.js";

const BASE_URL = "/club-events";

export const registerClubEvent = async (request, images) => {
    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    images?.forEach((file) => formData.append("images", file));

    return await adminAxios.post(`${BASE_URL}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const fetchAllClubEvents = async (subjectId) => {
    const params = subjectId ? { subjectId } : {};
    return await adminAxios.get(`${BASE_URL}`, { params });
};

export const fetchVisibleClubEvents = async (subjectId) => {
    const params = subjectId ? { subjectId } : {};
    return await adminAxios.get(`${BASE_URL}/visible`, { params });
};

export const fetchHiddenClubEvents = async (subjectId) => {
    const params = subjectId ? { subjectId } : {};
    return await adminAxios.get(`${BASE_URL}/hidden`, { params });
};

export const fetchClubEventById = async (eventId) => {
    return await adminAxios.get(`${BASE_URL}/${eventId}`);
};

export const hideClubEvent = async (eventId) => {
    return await adminAxios.patch(`${BASE_URL}/${eventId}/hide`);
};

export const unhideClubEvent = async (eventId) => {
    return await adminAxios.patch(`${BASE_URL}/${eventId}/show`);
};

export const fetchAllSubjects = async () => {
    return await adminAxios.get(`${BASE_URL}/subjects`);
};
