import { adminAxios } from "./adminAxios";

// 1. 전체 문의 목록 조회 (관리자)
export const fetchAllInquiries = () => {
    return adminAxios.get("/inquiries");
};

// 2. 단일 문의 상세 조회 (관리자)
export const fetchInquiryById = (id) => {
    return adminAxios.get(`/inquiries/${id}`);
};

// 3. 문의 답변 등록 (관리자)
export const answerInquiry = (id, answer) => {
    return adminAxios.patch(`/inquiries/${id}/answer`, { answer });
};
