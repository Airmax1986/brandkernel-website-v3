'use client'

import Image from 'next/image';
import { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

// Simple base64 blur placeholder for SSR
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'blur',
  blurDataURL: customBlurDataURL,
  onLoad,
  onError,
  style,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Default responsive sizes if not provided
  const defaultSizes = sizes || (
    fill 
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      : width && width > 640 
        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        : "100vw"
  );

  // Use custom blur URL or default
  const finalBlurDataURL = customBlurDataURL || blurDataURL;

  if (imageError) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          minHeight: height || 200,
          ...style
        }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    priority,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder as 'blur' | 'empty',
    blurDataURL: finalBlurDataURL,
    sizes: defaultSizes,
    className: `${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    style,
    ...props,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width!}
      height={height!}
    />
  );
}

// Hero image component with specific optimizations
export function HeroImage({ 
  src, 
  alt, 
  className = '',
  style
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      priority
      sizes="100vw"
      className={className}
      style={{
        width: '100%',
        height: 'auto',
        ...style
      }}
    />
  );
}

// Avatar component for author images, testimonials, etc.
export function Avatar({ 
  src, 
  alt, 
  size = 48, 
  className = '' 
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <div 
      className={`relative overflow-hidden rounded-full ${className}`} 
      style={{ width: size, height: size }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  );
}

// Logo component with specific optimizations
export function Logo({ 
  src, 
  alt = 'BrandKernel Logo', 
  width = 150, 
  height = 40, 
  className = '' 
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}