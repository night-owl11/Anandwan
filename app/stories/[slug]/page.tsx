'use client';

import { motion } from 'framer-motion';
import { Share2, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StoryPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 font-typewriter text-vintage-stamp hover:text-vintage-sepia transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>
      </div>

      {/* Story Header */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="letter-card p-8 md:p-12"
        >
          {/* Stamp */}
          <div className="mb-6">
            <span className="ink-stamp">Life Journeys</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-vintage-ink mb-6">
            From Darkness to Light
          </h1>

          {/* Date */}
          <p className="font-typewriter text-sm text-vintage-fade mb-8">
            A letter from Anandwan • Recorded in 2024
          </p>

          {/* Hero Image Placeholder */}
          <div className="h-96 bg-vintage-sepia/10 mb-8 rounded-sm" />

          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            <p className="font-handwritten text-2xl text-vintage-sepia leading-relaxed mb-8">
              "When I first arrived at Anandwan, I couldn't see a future. Today, I help others see theirs."
            </p>

            <div className="font-typewriter text-vintage-ink/90 space-y-6 leading-relaxed">
              <p>
                Her name is Meera. She arrived at Anandwan seven years ago, carrying nothing but 
                a small bag and an ocean of uncertainty. Life had been unkind—circumstances beyond 
                her control had stripped away her confidence, her livelihood, her sense of self.
              </p>

              <p>
                But Anandwan is not just a place. It's a promise. A promise that every person, 
                regardless of their past, deserves dignity, purpose, and the chance to rebuild.
              </p>

              <h3 className="font-serif text-2xl text-vintage-stamp mt-12 mb-4">
                The Transformation
              </h3>

              <p>
                In the sewing workshop, Meera found more than a skill. She found her voice. 
                Each stitch became an act of reclaiming her story. Each garment, a testament 
                to her resilience.
              </p>

              <p>
                Today, Meera doesn't just sew. She teaches. She mentors. She shows others 
                that transformation is not just possible—it's inevitable when you're surrounded 
                by a community that believes in you.
              </p>

              <div className="bg-vintage-paper border-l-4 border-vintage-stamp p-6 my-8">
                <p className="font-handwritten text-xl text-vintage-sepia italic">
                  "I came here broken. I leave every day whole. That's the magic of Anandwan."
                </p>
                <p className="font-typewriter text-sm text-vintage-fade mt-2">— Meera</p>
              </div>

              <h3 className="font-serif text-2xl text-vintage-stamp mt-12 mb-4">
                Today
              </h3>

              <p>
                Meera now leads a team of 12 artisans. Together, they create beautiful, 
                handcrafted garments that are sold across India. Every purchase supports 
                not just Meera, but an entire ecosystem of hope and transformation.
              </p>

              <p>
                This is not charity. This is dignity. This is work. This is life.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-vintage-sepia/20">
            <button className="flex items-center gap-2 px-6 py-3 bg-vintage-stamp text-white font-typewriter hover:bg-vintage-sepia transition-colors">
              <Share2 className="w-4 h-4" />
              Share This Story
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-vintage-stamp text-vintage-stamp font-typewriter hover:bg-vintage-stamp hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
              Support Meera's Work
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
