'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);

  const [textStage, setTextStage] = useState(0);
  const [showSignInMenu, setShowSignInMenu] = useState(false);

  useEffect(() => {
    // Faster, immediate transitions
    const timers = [
      setTimeout(() => setTextStage(1), 500),
      setTimeout(() => setTextStage(2), 1500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        className="absolute inset-0 scale-110"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/WhatsApp Video 2026-04-03 at 12.28.22 AM (1).mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-vintage-paper/90" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      </motion.div>

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.15, 0.4, 0.15],
            x: [-300, 300],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 left-0 w-[600px] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl transform -skew-x-12"
        />
      </div>

      {/* Sign In Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 right-8 z-50"
      >
        <div className="relative">
          <button
            onClick={() => setShowSignInMenu(!showSignInMenu)}
            className="flex items-center gap-2 px-6 py-3 bg-vintage-ink/95 hover:bg-vintage-ink text-vintage-paper font-serif text-base backdrop-blur-md border-2 border-vintage-stamp/50 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <User className="w-5 h-5" />
            Sign In
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showSignInMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showSignInMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-80 bg-white border-4 border-vintage-stamp shadow-2xl overflow-hidden z-50"
            >
              <Link
                href="/auth"
                className="block px-6 py-5 font-serif text-base text-vintage-ink hover:bg-vintage-stamp/20 border-b-2 border-vintage-sepia/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-vintage-stamp" />
                  <div>
                    <div className="font-bold text-lg text-vintage-ink">Sign in as Volunteer</div>
                    <div className="text-sm text-vintage-fade mt-1 font-body">Support Anandwan's mission</div>
                  </div>
                </div>
              </Link>
              
              <Link
                href="/admin"
                className="block px-6 py-5 font-serif text-base text-vintage-ink hover:bg-vintage-stamp/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-vintage-stamp" />
                  <div>
                    <div className="font-bold text-lg text-vintage-ink">Sign in as Anandwan's Authorizer</div>
                    <div className="text-sm text-vintage-fade mt-1 font-body">Manage content and stories</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32">
        {/* Opening Line */}
        {textStage >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-20 text-center"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-vintage-stamp/30 blur-[100px]"
              />
              
              <motion.h2 
                className="relative font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight will-change-transform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span 
                  className="block mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Some stories are not told...
                </motion.span>
                <motion.span 
                  className="block text-vintage-paper/90 italic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  they are lived.
                </motion.span>
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="h-0.5 bg-gradient-to-r from-transparent via-vintage-stamp to-transparent mt-8 mx-auto origin-center"
                style={{ width: '60%' }}
              />
            </div>
          </motion.div>
        )}

        {/* Split Layout */}
        {textStage >= 2 && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Marathi */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-left will-change-transform"
            >
              <motion.div
                initial={{ letterSpacing: '0.3em', opacity: 0 }}
                animate={{ letterSpacing: '0.05em', opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="mb-8"
              >
                <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight will-change-transform">
                  आनंदवन
                </h1>
                
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-1 bg-gradient-to-r from-vintage-stamp to-transparent mt-6 origin-left"
                  style={{ width: '80%' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="bg-black/40 backdrop-blur-sm border-l-4 border-vintage-stamp px-6 py-6 will-change-transform"
              >
                <p className="font-body text-lg md:text-xl text-white font-medium leading-relaxed italic drop-shadow-lg">
                  "We are building a system that ensures no story of Anandwan ever goes unseen again."
                </p>
              </motion.div>
            </motion.div>

            {/* Right - Photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.2,
              }}
              className="relative will-change-transform"
            >
              <div className="relative">
                {/* Animated Corner Borders */}
                <motion.div 
                  className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-vintage-stamp/60 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-vintage-stamp/60 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-vintage-stamp/60 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-vintage-stamp/60 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden border-8 border-vintage-paper/90 shadow-2xl will-change-transform"
                >
                  <motion.img
                    src="/images/cover-6087e64d5638a.webp"
                    alt="Baba Amte and his wife"
                    className="w-full h-auto object-cover will-change-transform"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                  
                  <div className="absolute inset-0 bg-vintage-sepia/10 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="mt-6 text-center bg-black/40 backdrop-blur-sm border-t-4 border-vintage-stamp py-4 px-6 will-change-transform"
                >
                  <p className="font-serif text-lg md:text-xl text-white font-medium italic drop-shadow-lg">
                    Baba Amte & Sadhana Tai - The Visionaries
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}


      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vintage-paper to-transparent" />
    </motion.section>
  );
}
