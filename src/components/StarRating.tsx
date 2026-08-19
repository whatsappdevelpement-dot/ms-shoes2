import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  textColor?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showLabel = true,
  textColor = 'text-gray-900',
}) => {
  const iconSize = size === 'lg' ? 'w-4 h-4' : size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-0.5 text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${iconSize} fill-amber-400 text-amber-400`} />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" className={`${iconSize} fill-amber-400 text-amber-400`} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${iconSize} text-gray-300 fill-gray-100`} />
        ))}
      </div>
      {showLabel && (
        <div className={`text-xs font-bold ${textColor} flex items-center space-x-1 ml-0.5`}>
          <span>{rating.toFixed(1)}</span>
          {reviewCount !== undefined && (
            <span className="text-gray-500 font-medium text-[11px]">({reviewCount})</span>
          )}
        </div>
      )}
    </div>
  );
};
