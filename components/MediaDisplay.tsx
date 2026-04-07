'use client';

import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface MediaDisplayProps {
  src: string;
  alt?: string;
  type?: 'image' | 'video';
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export default function MediaDisplay({
  src,
  alt = '',
  type,
  className = '',
  autoPlay = false,
  loop = true,
  muted = true,
  controls = false,
}: MediaDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  // Auto-detect type from file extension if not provided
  const mediaType = type || detectMediaType(src);

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (mediaType === 'video') {
    return (
      <div className={`relative group ${className}`}>
        <video
          ref={setVideoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Play/Pause Overlay (only if controls are disabled) */}
        {!controls && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-vintage-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-vintage-ink" />
              ) : (
                <Play className="w-8 h-8 text-vintage-ink ml-1" />
              )}
            </div>
          </button>
        )}

        {/* Video Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-vintage-ink/80 backdrop-blur-sm text-white font-typewriter text-xs rounded">
          VIDEO
        </div>
      </div>
    );
  }

  // Default to image
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function detectMediaType(src: string): 'image' | 'video' {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
  const lowerSrc = src.toLowerCase();
  
  if (videoExtensions.some(ext => lowerSrc.endsWith(ext))) {
    return 'video';
  }
  
  return 'image';
}
