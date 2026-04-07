'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import MediaDisplay from '@/components/MediaDisplay';

const WORKSHOPS = [
  {
    id: 1,
    title: 'Weaving Workshop',
    video: '/videos/WhatsApp Video 2026-04-03 at 12.28.22 AM.mp4',
    description: 'Where threads become stories',
  },
  {
    id: 2,
    title: 'Tailoring Unit',
    video: '/videos/WhatsApp Video 2026-04-03 at 12.28.23 AM.mp4',
    description: 'Stitching dignity into every garment',
  },
  {
    id: 3,
    title: 'Handicrafts',
    video: '/videos/WhatsApp Video 2026-04-03 at 12.28.30 AM.mp4',
    description: 'Crafting beauty from raw materials',
  },
  {
    id: 4,
    title: 'Music & Arts',
    video: '/videos/WhatsApp Video 2026-04-03 at 12.28.35 AM.mp4',
    description: 'Where souls find expression',
  },
];

export default function WorkSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative py-24 px-4 bg-vintage-ink/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-h2 text-vintage-ink mb-6">
            Work with Dignity
          </h2>
          <p className="font-body text-body text-vintage-sepia max-w-3xl mx-auto leading-relaxed italic">
            Here, every individual contributes with strength, skill, and quiet determination.
          </p>
        </motion.div>

        {/* Workshop Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {WORKSHOPS.map((workshop, index) => (
            <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function WorkshopCard({ workshop, index }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden"
      >
        {/* Video Container */}
        <div className="relative h-96 bg-vintage-ink/10">
          <MediaDisplay
            src={workshop.video}
            type="video"
            autoPlay={isHovered}
            muted={true}
            loop={true}
            className="h-full"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-vintage-ink/80 via-vintage-ink/20 to-transparent" />

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="font-serif text-h3 text-white mb-2">
              {workshop.title}
            </h3>
            <p className="font-body text-body-sm text-white/90">
              {workshop.description}
            </p>
          </div>

          {/* Border Effect */}
          <div className="absolute inset-0 border-4 border-white/10 pointer-events-none" />
        </div>

        {/* Shadow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-vintage-ink/20 blur-xl -z-10 transform translate-y-4"
        />
      </motion.div>
    </motion.div>
  );
}
