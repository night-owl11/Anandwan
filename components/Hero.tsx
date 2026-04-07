'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
      {/* Vintage overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-vintage-paper/50 to-vintage-paper" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl text-vintage-ink mb-6">
            Anandwan
          </h1>
          <div className="inline-block ink-stamp mb-8">
            STORIES THAT MUST BE TOLD
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-handwritten text-2xl md:text-4xl text-vintage-sepia max-w-2xl mx-auto leading-relaxed"
        >
          A living archive of human resilience, where every story is a testament to the power of transformation
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12"
        >
          <div className="inline-block border-t-2 border-vintage-sepia/30 pt-4">
            <p className="font-typewriter text-sm text-vintage-fade">
              Scroll to explore real stories from real lives
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
