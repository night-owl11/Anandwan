'use client';

import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SpecialArtsButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-8 right-8 z-40"
    >
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => router.push('/special-arts')}
        className="relative group"
      >
        {/* Main Button */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="letter-card px-6 py-4 flex items-center gap-3 cursor-pointer"
        >
          <Palette className="w-5 h-5 text-vintage-stamp" />
          <span className="font-typewriter text-vintage-ink whitespace-nowrap">
            View Our Creations
          </span>
        </motion.div>

        {/* Ink Spread Effect */}
        <motion.div
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 0.2 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-vintage-stamp rounded-full blur-xl -z-10"
        />

        {/* Stamp Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            rotate: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -top-2 -right-2 w-8 h-8 border-2 border-vintage-stamp rounded-full bg-vintage-stamp/20"
        />
      </motion.button>
    </motion.div>
  );
}
