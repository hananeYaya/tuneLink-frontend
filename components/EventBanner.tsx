import React from 'react';

interface EventBannerProps {
  title: string;
  description: string;
  image?: string;
  route: string;
  onPress: () => void;
}

const EventBanner: React.FC<EventBannerProps> = ({ 
  title, 
  description, 
  image, 
  route, 
  onPress 
}) => {
  return (
    <div 
      className="relative overflow-hidden rounded-xl mb-4 cursor-pointer" 
      onClick={onPress}
    >
      <div className="relative h-40 w-full">
        <img 
          src={image || '/api/placeholder/400/150'} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
          <h2 className="text-white text-lg font-bold mb-1">{title}</h2>
          <p className="text-white text-sm opacity-80">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;