// src/pages/BannerManagePage.jsx

import React, { useState, useEffect } from 'react';
import { BannerList } from '../components/banner/BannerList';
import { BannerModal } from '../components/banner/BannerModal';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function BannerManagePage() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const navigate = useNavigate();

  // 배너 목록 조회
  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/admin/banners');
      setBanners(response.data.map(banner => ({
        ...banner,
        isPosted: banner.posted // API 응답의 posted를 isPosted로 매핑
      })));
      setError(null);
    } catch (err) {
      console.error('배너 목록 조회 에러:', err);
      setError('배너 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 배너 순서 변경
  const handleOrderChange = async (newBanners) => {
    try {
      const orderUpdateData = newBanners
        .filter(banner => banner.isPosted)
        .map((banner, index) => ({
          eventBannerId: banner.eventBannerId,
          bannerOrder: index + 1
        }));

      await axios.put('/api/admin/banners/order', orderUpdateData);
      await fetchBanners(); // 순서 변경 후 목록 새로고침
    } catch (err) {
      console.error('순서 변경 에러:', err);
      setError('배너 순서 변경에 실패했습니다.');
    }
  };

  // 배너 삭제
  const handleDelete = async (bannerId) => {
    if (!window.confirm('정말로 이 배너를 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/admin/banners/${bannerId}`);
      await fetchBanners(); // 삭제 후 목록 새로고침
    } catch (err) {
      console.error('배너 삭제 에러:', err);
      setError('배너 삭제에 실패했습니다.');
    }
  };

  // 배너 수정
  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  // 배너 추가
  const handleAdd = () => {
    setSelectedBanner(null);
    setIsModalOpen(true);
  };

  // 배너 활성화/비활성화 토글
  const handleToggleActive = async (bannerId) => {
    try {
      const targetBanner = banners.find(b => b.eventBannerId === bannerId);
      const isActivating = !targetBanner.isPosted;
      
      // 활성화되는 경우 맨 마지막 순서로 배치
      const lastActiveOrder = isActivating 
        ? Math.max(...banners.filter(b => b.isPosted).map(b => b.bannerOrder), 0) + 1 
        : 0;

      await axios.put(`/api/admin/banners/${bannerId}`, {
        eventBannerId: bannerId,
        imgUrl: targetBanner.imgUrl,
        siteUrl: targetBanner.siteUrl,
        posted: isActivating,
        bannerOrder: lastActiveOrder,
        startDate: targetBanner.startDate,
        endDate: targetBanner.endDate
      });

      await fetchBanners(); // 상태 변경 후 목록 새로고침
    } catch (err) {
      console.error('상태 변경 에러:', err);
      setError('배너 상태 변경에 실패했습니다.');
    }
  };

  // 모달 제출 처리
  const handleModalSubmit = async (formData) => {
    try {
      if (selectedBanner) {
        // 수정
        await axios.put(`/api/admin/banners/${selectedBanner.eventBannerId}`, {
          ...formData,
          eventBannerId: selectedBanner.eventBannerId,
          posted: selectedBanner.isPosted,
          bannerOrder: selectedBanner.bannerOrder
        });
      } else {
        // 추가
        await axios.post('/api/admin/banners', {
          ...formData,
          posted: false,
          bannerOrder: 0
        });
      }
      
      setIsModalOpen(false);
      setSelectedBanner(null);
      await fetchBanners(); // 수정/추가 후 목록 새로고침
    } catch (err) {
      console.error('배너 처리 에러:', err);
      setError(selectedBanner ? '배너 수정에 실패했습니다.' : '배너 추가에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">배너 관리</h1>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              새 배너 추가
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : (
            <BannerList
              banners={banners}
              onOrderChange={handleOrderChange}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggleActive={handleToggleActive}
            />
          )}

          <BannerModal
            banner={selectedBanner}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedBanner(null);
            }}
            onSubmit={handleModalSubmit}
          />
        </div>
      </main>
    </div>
  );
}

export default BannerManagePage;