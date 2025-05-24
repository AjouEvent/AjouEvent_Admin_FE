import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

export function BannerItem({ banner, onDelete, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: banner.eventBannerId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-2 hover:bg-gray-100 rounded"
      >
        ⋮⋮
      </div>
      
      <div className="flex-shrink-0 w-48 h-32 overflow-hidden rounded">
        <img
          src={banner.imgUrl}
          alt="배너 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-500">순서: {banner.bannerOrder}</span>
          <span className="text-sm text-gray-500">|</span>
          <span className={`text-sm ${banner.isPosted ? 'text-green-500' : 'text-red-500'}`}>
            {banner.isPosted ? '활성' : '비활성'}
          </span>
        </div>
        
        <a
          href={banner.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-2 block"
        >
          {banner.siteUrl}
        </a>
        
        <div className="text-sm text-gray-500">
          {format(new Date(banner.startDate), 'yyyy-MM-dd')} ~{' '}
          {format(new Date(banner.endDate), 'yyyy-MM-dd')}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
        >
          수정
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
        >
          삭제
        </button>
      </div>
    </div>
  );
} 