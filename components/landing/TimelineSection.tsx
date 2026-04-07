'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Heart, Users, Award, Globe, Lightbulb } from 'lucide-react';

const journeySteps = [
  {
    year: '1914',
    title: 'A Privileged Beginning',
    description: 'Born into privilege, a lawyer. Destiny had other plans.',
    icon: Sparkles,
  },
  {
    year: '1940s',
    title: 'The Turning Point',
    description: 'Saw a man dying from leprosy. Asked: "If I am afraid, how will society change?"',
    icon: Lightbulb,
    highlight: true,
  },
  {
    year: '1949',
    title: 'Birth of Anandwan',
    description: 'Barren land. No funds. Just belief: "Work builds dignity, not charity."',
    icon: Heart,
  },
  {
    year: '1950s-60s',
    title: 'Transformation Begins',
    description: 'Opportunity over sympathy. Rejected people started creating, contributing.',
    icon: Users,
  },
  {
    year: '1970s-80s',
    title: 'Self-Sustaining Community',
    description: 'Complete village - hospitals, schools, workshops. A living model of dignity.',
    icon: Globe,
  },
  {
    year: 'Today',
    title: 'Global Inspiration',
    description: 'Ramon Magsaysay Award. Padma Vibhushan. Where people rebuild themselves.',
    icon: Award,
    highlight: true,
  },
];

const principles = [
  { title: 'Self-Sustainability', desc: 'Produces its own food, runs its own industries' },
  { title: 'Dignity Over Sympathy', desc: 'No begging culture - everyone contributes' },
  { title: 'Skill-Based Rehabilitation', desc: 'Focus on abilities, not disabilities' },
  { title: 'Community Living', desc: 'Inclusive and supportive ecosystem' },
];

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-vintage-paper via-vintage-paper/50 to-vintage-paper overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-32 bg-vintage-stamp mx-auto mb-8"
          />
          
          <h2 className="font-serif text-h2 md:text-5xl text-vintage-ink mb-6">
            The Journey
          </h2>
          
          <p className="font-body text-body text-vintage-text max-w-3xl mx-auto leading-relaxed italic">
            "From fear to courage. From barren land to a forest of joy."
          </p>
        </motion.div>

        {/* Video Feature - Optimized for Full Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white p-4 shadow-2xl">
              {/* Ornate Frame */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-vintage-stamp" />
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-vintage-stamp" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-vintage-stamp" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-vintage-stamp" />

              {/* Video Container with Aspect Ratio */}
              <div className="relative overflow-hidden bg-vintage-ink/10" style={{ maxHeight: '70vh' }}>
                <video
                  controls
                  className="w-full h-auto"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  poster="/images/cover-6087e64d5638a.webp"
                >
                  <source src="/videos/WhatsApp Video 2026-04-03 at 3.54.54 PM.mp4" type="video/mp4" />
                </video>
                
                {/* Vintage Overlay */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-vintage-sepia/10 mix-blend-multiply pointer-events-none" />
                )}
              </div>

              {/* Caption */}
              <div className="mt-4 text-center border-t-2 border-vintage-stamp/30 pt-4">
                <p className="font-serif text-lg md:text-xl text-vintage-ink italic">
                  A Glimpse into the Heart of Anandwan
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline - Full Width */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="space-y-6">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative pl-16 pr-6 py-5 border-l-4 ${
                    step.highlight ? 'border-vintage-stamp bg-vintage-stamp/5' : 'border-vintage-sepia/40 bg-white/40'
                  } backdrop-blur-sm hover:bg-white/60 transition-all duration-300 group`}
                >
                  {/* Icon Circle */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${
                    step.highlight ? 'bg-vintage-stamp' : 'bg-vintage-sepia'
                  } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Year Badge */}
                  <div className={`inline-block px-3 py-1 mb-2 ${
                    step.highlight ? 'bg-vintage-stamp' : 'bg-vintage-sepia/30'
                  } rounded text-sm font-typewriter ${
                    step.highlight ? 'text-white' : 'text-vintage-sepia'
                  } font-bold`}>
                    {step.year}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif text-xl text-vintage-ink mb-2 group-hover:text-vintage-stamp transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-body text-body-sm text-vintage-text leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-serif text-h2 text-vintage-ink mb-4">
              What Makes Anandwan Unique
            </h3>
            <div className="h-1 w-24 bg-vintage-stamp mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative p-6 bg-white/60 backdrop-blur-sm border-2 border-vintage-fade/30 hover:border-vintage-stamp transition-all duration-300 group"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-vintage-stamp opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-vintage-stamp opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-vintage-stamp opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-vintage-stamp opacity-0 group-hover:opacity-100 transition-opacity" />

                <h4 className="font-serif text-xl text-vintage-ink mb-3 group-hover:text-vintage-stamp transition-colors">
                  {principle.title}
                </h4>
                <p className="font-body text-body-sm text-vintage-text leading-relaxed">
                  {principle.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto p-10 bg-gradient-to-br from-vintage-stamp/10 to-vintage-sepia/10 border-4 border-vintage-stamp/30 relative">
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-vintage-stamp" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-vintage-stamp" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-vintage-stamp" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-vintage-stamp" />
            
            <p className="font-serif text-2xl md:text-3xl text-vintage-ink leading-relaxed mb-6 italic">
              "Anandwan is not a place where people are helped. It is a place where people rebuild themselves."
            </p>
            <p className="font-body text-lg text-vintage-sepia">
              Not just an NGO or rehabilitation center — a living model of dignity, self-reliance, and human transformation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
