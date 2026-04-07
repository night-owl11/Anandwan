'use client';

import { motion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_STORIES = [
  {
    id: 1,
    category: 'Life Journeys',
    title: 'From Darkness to Light',
    hook: 'She arrived with nothing but hope. Today, she teaches others to see beauty in every stitch.',
    image: '/api/placeholder/600/400',
    slug: 'from-darkness-to-light'
  },
  {
    id: 2,
    category: 'Transformations',
    title: 'Hands That Create',
    hook: 'His hands once trembled with uncertainty. Now they craft masterpieces that tell stories of resilience.',
    image: '/api/placeholder/600/400',
    slug: 'hands-that-create'
  },
  {
    id: 3,
    category: 'Talent & Work',
    title: 'Threads of Dignity',
    hook: 'Every garment carries a story. Every pattern represents a journey from struggle to strength.',
    image: '/api/placeholder/600/400',
    slug: 'threads-of-dignity'
  },
];

export default function StoryFeed() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-vintage-ink mb-4">
          Letters from Anandwan
        </h2>
        <p className="font-typewriter text-vintage-fade">
          Each story is a window into a life transformed
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAMPLE_STORIES.map((story, index) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}
      </div>
    </section>
  );
}

function StoryCard({ story, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Link href={`/stories/${story.slug}`}>
        <div className="letter-card overflow-hidden cursor-pointer group">
          {/* Image placeholder */}
          <div className="h-64 bg-vintage-sepia/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vintage-ink/20" />
            <div className="absolute top-4 left-4">
              <span className="ink-stamp text-xs">{story.category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-serif text-2xl text-vintage-ink mb-3 group-hover:text-vintage-stamp transition-colors">
              {story.title}
            </h3>
            <p className="font-typewriter text-sm text-vintage-fade leading-relaxed mb-4">
              {story.hook}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-vintage-sepia/20">
              <span className="font-typewriter text-xs text-vintage-stamp flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Read Full Letter
              </span>
              <Heart className="w-5 h-5 text-vintage-fade group-hover:text-red-600 group-hover:fill-red-600 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
