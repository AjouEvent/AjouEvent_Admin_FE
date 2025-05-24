import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function BannerModal({ banner, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    bannerOrder: '',
    imgUrl: '',
    siteUrl: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (banner) {
      setFormData({
        bannerOrder: banner.bannerOrder,
        imgUrl: banner.imgUrl,
        siteUrl: banner.siteUrl,
        startDate: format(new Date(banner.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(banner.endDate), 'yyyy-MM-dd'),
      });
    } else {
      setFormData({
        bannerOrder: '',
        imgUrl: '',
        siteUrl: '',
        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
      });
    }
  }, [banner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {banner ? '배너 수정' : '새 배너 추가'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              순서
            </label>
            <input
              type="number"
              name="bannerOrder"
              value={formData.bannerOrder}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지 URL
            </label>
            <input
              type="text"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사이트 URL
            </label>
            <input
              type="text"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              시작일
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              종료일
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {banner ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 