import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

export function BannerItem({ banner, onDelete, onEdit, onToggleActive, isDraggable = true }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: banner.eventBannerId,
    disabled: !isDraggable
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white rounded-lg shadow-md ${isDraggable ? 'cursor-move' : ''}`}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={banner.imgUrl}
            alt="배너 이미지"
            className="w-24 h-16 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{banner.siteUrl || '제목 없음'}</h3>
            <p className="text-sm text-gray-500">{banner.siteUrl}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500 mr-2">상태:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={banner.isPosted}
                  onChange={() => onToggleActive(banner.eventBannerId)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {banner.isPosted ? '활성' : '대기'}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(banner)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(banner.eventBannerId)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
} 