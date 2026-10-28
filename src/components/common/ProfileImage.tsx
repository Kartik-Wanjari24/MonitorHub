import React, { useState } from 'react';
import { getDoctorImage, getPatientImage, getInitials } from '../../services/profileImages';

interface ProfileImageProps {
  type: 'doctor' | 'patient';
  identifier: string; // Doctor name or Patient ID/name
  name?: string; // Full name for fallback initials
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: 'w-8 h-8 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

export const ProfileImage: React.FC<ProfileImageProps> = ({
  type,
  identifier,
  name,
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = type === 'doctor' ? getDoctorImage(identifier) : getPatientImage(identifier);
  const displayName = name || identifier;
  const initials = getInitials(displayName);

  const baseClasses = `${sizeClasses[size]} rounded-full object-cover shrink-0 ${className}`;

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Show initials fallback if image fails to load or while loading
  if (imageError) {
    return (
      <div
        className={`${baseClasses} ${
          type === 'doctor'
            ? 'bg-gradient-to-tr from-blue-600 to-indigo-600'
            : 'bg-gradient-to-tr from-emerald-600 to-teal-700'
        } text-white font-black flex items-center justify-center`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {isLoading && (
        <div
          className={`${baseClasses} ${
            type === 'doctor'
              ? 'bg-gradient-to-tr from-blue-600 to-indigo-600'
              : 'bg-gradient-to-tr from-emerald-600 to-teal-700'
          } text-white font-black flex items-center justify-center animate-pulse`}
        >
          {initials}
        </div>
      )}
      <img
        src={imageUrl}
        alt={displayName}
        className={`${baseClasses} ${isLoading ? 'absolute inset-0 opacity-0' : 'opacity-100'} transition-opacity duration-300 ring-2 ${
          type === 'doctor' ? 'ring-blue-100' : 'ring-emerald-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};
