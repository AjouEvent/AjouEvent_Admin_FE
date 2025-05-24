// src/pages/BannerManagePage.jsx

import React, { useState, useEffect } from 'react';
import { BannerList } from '../components/banner/BannerList';
import { BannerModal } from '../components/banner/BannerModal';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// 테스트용 더미 데이터
const DUMMY_BANNERS = [
  {
    eventBannerId: 1,
    bannerOrder: 1,
    imgUrl: 'https://picsum.photos/seed/1/600/200',
    siteUrl: 'https://ajou.ac.kr/page1',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  },
  {
    eventBannerId: 2,
    bannerOrder: 2,
    imgUrl: 'https://picsum.photos/seed/2/600/200',
    siteUrl: 'https://ajou.ac.kr/page2',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  },
  {
    eventBannerId: 3,
    bannerOrder: 3,
    imgUrl: 'https://picsum.photos/seed/3/600/200',
    siteUrl: 'https://ajou.ac.kr/page3',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  },
  {
    eventBannerId: 4,
    bannerOrder: 4,
    imgUrl: 'https://picsum.photos/seed/4/600/200',
    siteUrl: 'https://ajou.ac.kr/page4',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  },
  {
    eventBannerId: 5,
    bannerOrder: 5,
    imgUrl: 'https://picsum.photos/seed/5/600/200',
    siteUrl: 'https://ajou.ac.kr/page5',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  },
  {
    eventBannerId: 6,
    bannerOrder: 6,
    imgUrl: 'https://picsum.photos/seed/6/600/200',
    siteUrl: 'https://ajou.ac.kr/page6',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  },
  {
    eventBannerId: 7,
    bannerOrder: 7,
    imgUrl: 'https://picsum.photos/seed/7/600/200',
    siteUrl: 'https://ajou.ac.kr/page7',
    startDate: '2025-05-20',
    endDate: '2025-06-01',
    isPosted: true
  }
];

function BannerManagePage() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const navigate = useNavigate();

  // 배너 목록 조회 (테스트용)
  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      // 실제 API 호출 대신 더미 데이터 사용
      setBanners(DUMMY_BANNERS);
      setError(null);
    } catch (err) {
      setError('배너 목록을 불러오는데 실패했습니다.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 배너 순서 변경 (테스트용)
  const handleOrderChange = async (newBanners) => {
    try {
      // 실제 API 호출 없이 상태만 업데이트
      setBanners(newBanners);
    } catch (err) {
      setError('배너 순서 변경에 실패했습니다.');
      console.error('Error:', err);
    }
  };

  // 배너 삭제 (테스트용)
  const handleDelete = async (bannerId) => {
    if (!window.confirm('정말로 이 배너를 삭제하시겠습니까?')) return;

    try {
      // 실제 API 호출 없이 상태만 업데이트
      setBanners(banners.filter(banner => banner.eventBannerId !== bannerId));
    } catch (err) {
      setError('배너 삭제에 실패했습니다.');
      console.error('Error:', err);
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

  // 모달 제출 처리 (테스트용)
  const handleModalSubmit = async (formData) => {
    try {
      if (selectedBanner) {
        // 수정 - 실제 API 호출 없이 상태만 업데이트
        setBanners(banners.map(banner => 
          banner.eventBannerId === selectedBanner.eventBannerId 
            ? { ...banner, ...formData }
            : banner
        ));
      } else {
        // 추가 - 실제 API 호출 없이 상태만 업데이트
        const newBanner = {
          ...formData,
          eventBannerId: Math.max(...banners.map(b => b.eventBannerId)) + 1,
          isPosted: true
        };
        setBanners([...banners, newBanner]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError(selectedBanner ? '배너 수정에 실패했습니다.' : '배너 추가에 실패했습니다.');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

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

          <BannerList
            banners={banners}
            onOrderChange={handleOrderChange}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <BannerModal
            banner={selectedBanner}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
        </div>
      </main>
    </div>
  );
}

export default BannerManagePage;