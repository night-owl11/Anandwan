'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    image: '/images/WhatsApp Image 2026-04-03 at 4.09.09 PM.jpeg',
    hook: '"Charity destroys; work builds." I am no longer a seeker of help, but a creator of solutions.',
    preview: 'Meera leads the handloom unit at Anandwan. She believes that every thread woven is a step toward breaking the stigma of dependency and reclaiming her place in society.',
  },
  {
    id: 2,
    image: '/images/WhatsApp Image 2026-04-03 at 4.09.16 PM.jpeg',
    hook: 'At Anandwan, we don’t count what is lost. We count the trees planted and the lives restored.',
    preview: 'Rajesh manages the sustainable farming initiative. His expertise in organic irrigation has turned barren land into a lush, self-sustaining ecosystem for thousands.',
  },
  {
    id: 3,
    image: '/images/WhatsApp Image 2026-04-03 at 4.09.40 PM.jpeg',
    hook: 'The world saw a patient. Baba saw an architect. Today, I design the very spaces that gave me a second life.',
    preview: 'Lakshmi specializes in ecological architecture. She uses her voice and her designs to prove that physical limitations are secondary to a vision of a better world.',
  },
  {
    id: 4,
    image: '/images/WhatsApp Image 2026-04-03 at 4.10.57 PM.jpeg',
    hook: 'Leprosy took my fingers, but it couldn’t touch my resolve. My tools are an extension of my spirit.',
    preview: 'Mohan is a master craftsman in the metal workshop. His precision work on agricultural tools supports the entire community’s food security.',
  },
  {
    id: 5,
    image: '/images/WhatsApp Image 2026-04-03 at 4.11.08 PM.jpeg',
    hook: 'Vision is not about sight; it is about seeing the dignity in every human soul.',
    preview: 'Geeta mentors the new arrivals at Anandwan. She helps them see past their immediate trauma to the productive, dignified artisans they are meant to become.',
  },
  {
    id: 6,
    image: '/images/WhatsApp Image 2026-04-03 at 4.15.05 PM.jpeg',
    hook: 'We were social outcasts. Now, we are the living proof of what a self-reliant community can achieve.',
    preview: 'Anil pioneered the zero-waste paper-making unit. His journey from isolation to innovation is a cornerstone of Anandwan’s mission of environmental and social harmony.',
  },
];

export default function StoriesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const [selectedStory, setSelectedStory] = useState<any>(null);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y }}
      className="relative py-24 px-4"
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
          <h2 className="font-serif text-h2 text-vintage-ink mb-4">
            Stories That Changed Lives
          </h2>
          <p className="font-body text-body text-vintage-sepia italic max-w-2xl mx-auto">
            Real people. Real transformations. Real dignity.
          </p>
        </motion.div>

        {/* Horizontal Scroll Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORIES.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              onClick={() => setSelectedStory(story)}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedStory && (
        <PreviewModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </motion.section>
  );
}

function StoryCard({ story, index, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
          rotateY: isHovered ? 3 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Photo Frame Effect */}
        <div className="bg-white p-4 shadow-2xl">
          {/* Image */}
          <div className="relative h-80 overflow-hidden mb-4">
            <img
              src={story.image}
              alt={story.hook}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Hook Text */}
          <p className="font-body text-body-sm text-vintage-text leading-relaxed">
            {story.hook}
          </p>
        </div>

        {/* Shadow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-vintage-ink/30 blur-xl -z-10 transform translate-y-6"
        />
      </motion.div>
    </motion.div>
  );
}

function PreviewModal({ story, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-vintage-ink/90 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full"
      >
        <div className="letter-card p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-vintage-stamp/10 hover:bg-vintage-stamp/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-vintage-ink" />
          </button>

          {/* Image */}
          <div className="h-64 mb-6 overflow-hidden rounded-sm">
            <img
              src={story.image}
              alt={story.hook}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hook */}
          <h3 className="font-serif text-h3 text-vintage-sepia mb-4 italic">
            {story.hook}
          </h3>

          {/* Preview */}
          <p className="font-body text-body text-vintage-text leading-relaxed mb-6">
            {story.preview}
          </p>

          {/* Note */}
          <div className="border-t border-vintage-sepia/20 pt-4">
            <p className="font-body text-body-sm text-vintage-fade italic">
              Enter Anandwan to read the full story...
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
