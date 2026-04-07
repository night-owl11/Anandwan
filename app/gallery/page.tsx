'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const GALLERY_VIDEOS = [
  { id: 1, src: '/videos/WhatsApp Video 2026-04-03 at 12.28.22 AM (2).mp4', title: 'A New Day Begins', caption: 'Every sunrise brings hope and purpose' },
  { id: 2, src: '/videos/WhatsApp Video 2026-04-03 at 12.28.24 AM.mp4', title: 'Hands at Work', caption: 'Creating with skill and dedication' },
  { id: 3, src: '/videos/WhatsApp Video 2026-04-03 at 12.28.29 AM.mp4', title: 'Preserving Heritage', caption: 'Traditions passed through generations' },
  { id: 4, src: '/videos/WhatsApp Video 2026-04-03 at 12.28.41 AM.mp4', title: 'Moments of Joy', caption: 'Laughter that echoes through the community' },
  { id: 5, src: '/videos/WhatsApp Video 2026-04-03 at 12.29.06 AM.mp4', title: 'Evening Reflections', caption: 'Stories shared as the day ends' },
];

export default function GalleryPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-vintage-paper">
      {/* Hero Section */}
      <div className="relative py-32 px-4 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Link 
            href="/landing" 
            className="inline-flex items-center gap-2 mb-12 text-vintage-text hover:text-vintage-stamp transition-colors font-serif group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 w-32 bg-vintage-stamp mx-auto mb-8"
            />

            <h1 className="font-serif text-7xl md:text-8xl text-vintage-ink mb-6">
              Gallery
            </h1>
            
            <p className="font-body text-xl text-vintage-sepia max-w-2xl mx-auto italic">
              Moments that capture the spirit of Anandwan
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GALLERY_VIDEOS.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Card */}
                <div className="relative bg-white p-5 shadow-lg hover:shadow-2xl transition-shadow duration-500 rounded-lg">
                  {/* Corner Accents */}
                  <motion.div 
                    className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-vintage-stamp/40"
                    animate={{ opacity: hoveredId === video.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-vintage-stamp/40"
                    animate={{ opacity: hoveredId === video.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-vintage-stamp/40"
                    animate={{ opacity: hoveredId === video.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-vintage-stamp/40"
                    animate={{ opacity: hoveredId === video.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden rounded-md bg-vintage-ink/5 mb-4">
                    <video
                      src={video.src}
                      className="w-full h-full object-cover transition-all duration-700"
                      style={{
                        filter: hoveredId === video.id ? 'grayscale(0%)' : 'grayscale(100%)',
                        transform: hoveredId === video.id ? 'scale(1.05)' : 'scale(1)',
                      }}
                      muted
                      loop
                      playsInline
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: hoveredId === video.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
                        <Play className="w-8 h-8 text-vintage-stamp ml-1" fill="currentColor" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-serif text-xl text-vintage-ink group-hover:text-vintage-stamp transition-colors duration-300 mb-2">
                      {video.title}
                    </h3>
                    <p className="font-body text-sm text-vintage-sepia italic leading-relaxed">
                      {video.caption}
                    </p>
                  </div>
                </div>

                {/* Shadow */}
                <motion.div
                  className="absolute inset-0 bg-vintage-ink/10 blur-xl -z-10 rounded-lg"
                  animate={{
                    y: hoveredId === video.id ? 12 : 8,
                    opacity: hoveredId === video.id ? 0.3 : 0.15,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-7 h-7 text-white" />
            </motion.button>

            {/* Video */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h3 className="font-serif text-3xl text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="font-body text-lg text-white/70 italic">
                  {selectedVideo.caption}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
