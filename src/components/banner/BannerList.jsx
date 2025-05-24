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

export function BannerList({ banners, onOrderChange, onDelete, onEdit }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = banners.findIndex((banner) => banner.eventBannerId === active.id);
      const newIndex = banners.findIndex((banner) => banner.eventBannerId === over.id);
      
      const newBanners = arrayMove(banners, oldIndex, newIndex).map((banner, index) => ({
        ...banner,
        bannerOrder: index + 1,
      }));
      
      onOrderChange(newBanners);
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={banners.map((banner) => banner.eventBannerId)}
          strategy={verticalListSortingStrategy}
        >
          {banners.map((banner) => (
            <BannerItem
              key={banner.eventBannerId}
              banner={banner}
              onDelete={() => onDelete(banner.eventBannerId)}
              onEdit={() => onEdit(banner)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
} 