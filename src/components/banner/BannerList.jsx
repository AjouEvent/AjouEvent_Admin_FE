import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BannerItem } from './BannerItem';

export function BannerList({ banners, onOrderChange, onDelete, onEdit, onToggleActive }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 활성/대기 배너 분리
  const activeBanners = banners.filter(banner => banner.isPosted);
  const inactiveBanners = banners.filter(banner => !banner.isPosted);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = activeBanners.findIndex(banner => banner.eventBannerId === active.id);
      const newIndex = activeBanners.findIndex(banner => banner.eventBannerId === over.id);
      
      const newBanners = arrayMove(activeBanners, oldIndex, newIndex);
      const updatedBanners = [...newBanners, ...inactiveBanners];
      onOrderChange(updatedBanners);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">활성 배너</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activeBanners.map(banner => banner.eventBannerId)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {activeBanners.map((banner) => (
                <BannerItem
                  key={banner.eventBannerId}
                  banner={banner}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onToggleActive={onToggleActive}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">대기중인 배너</h2>
        <div className="space-y-4">
          {inactiveBanners.map((banner) => (
            <BannerItem
              key={banner.eventBannerId}
              banner={banner}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
              isDraggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 