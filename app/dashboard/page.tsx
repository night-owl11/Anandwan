'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import SpecialAbilities from '@/components/SpecialAbilities';
import SpecialArtsButton from '@/components/SpecialArtsButton';

export default function DashboardPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main className="min-h-screen relative">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Vintage Paper Base */}
      <div className="absolute inset-0 bg-vintage-paper" />

      {/* Animated Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-vintage-stamp/20 via-transparent to-transparent blur-3xl transform -skew-x-12"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            x: [100, -100, 100],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 right-1/4 w-96 h-full bg-gradient-to-b from-vintage-sepia/15 via-transparent to-transparent blur-3xl transform skew-x-12"
        />
      </div>

      {/* Special Arts Button - Fixed Position */}
      <SpecialArtsButton />

      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <h1 className="font-serif text-7xl md:text-8xl text-vintage-ink mb-8 tracking-wide">
              Anandwan
            </h1>
            <div className="inline-block ink-stamp mb-8 text-lg">
              A LIVING MUSEUM OF HUMAN RESILIENCE
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="font-handwritten text-3xl md:text-5xl text-vintage-sepia leading-relaxed mb-12"
          >
            Where every story is a testament to the power of transformation
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-px h-16 bg-vintage-sepia/30 animate-pulse" />
            <p className="font-typewriter text-sm text-vintage-fade">
              Scroll to discover stories
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Special Abilities Section */}
      <SpecialAbilities />

      {/* Footer Quote */}
      <section className="relative py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="letter-card p-12">
            <p className="font-handwritten text-2xl md:text-3xl text-vintage-sepia leading-relaxed">
              "We are building a system that ensures no story of Anandwan ever goes unseen again."
            </p>
            <div className="mt-6 pt-6 border-t border-vintage-sepia/20">
              <p className="font-typewriter text-sm text-vintage-fade">
                Every story matters. Every life has dignity. Every person deserves to be seen.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
