// src/api/banner.js

import { adminAxios } from './adminAxios';

// 배너 목록 조회
// export const getBanners = () => adminAxios.get('/banners');

// 배너 목록 조회 + posted → isPosted 매핑 포함
export const getBanners = async () => {
    const res = await adminAxios.get('/banners/active');
    return res.data.map(banner => ({
        ...banner,
        isPosted: banner.posted, // 매핑
    }));
};

// 배너 순서 변경 <- 이런 엔드포인트 없습니다
export const updateBannerOrder = (orderList) =>
    adminAxios.put('/banners/order', orderList);

// 배너 삭제
export const deleteBanner = (id) =>
    adminAxios.delete(`/banners/${id}`);

// 배너 수정/활성화/비활성화
export const updateBannerById = (id, data) =>
    adminAxios.put(`/banners/${id}`, data);

// 배너 추가
export const createBanner = (data) =>
    adminAxios.post('/banners', data);
