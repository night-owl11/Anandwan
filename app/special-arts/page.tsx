'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';

const ARTWORKS = [
  {
    id: 1,
    title: 'Handwoven Cotton Fabric',
    description: 'Traditional weaving techniques meet contemporary design',
    price: '₹1,200',
    creator: 'Ramesh',
    creatorStory: 'Ramesh learned weaving at Anandwan and now leads a team of 10 artisans, creating beautiful textiles that preserve traditional techniques.',
    image: '/images/WhatsApp Image 2026-04-03 at 12.28.20 AM.jpeg',
    category: 'Textiles',
  },
  {
    id: 2,
    title: 'Embroidered Table Runner',
    description: 'Intricate embroidery work showcasing skilled craftsmanship',
    price: '₹800',
    creator: 'Sunita',
    creatorStory: 'Sunita found her calling in embroidery. Each piece she creates tells a story of patience, precision, and artistic vision.',
    image: '/images/WhatsApp Image 2026-04-03 at 12.28.20 AM (1).jpeg',
    category: 'Home Decor',
  },
  {
    id: 3,
    title: 'Natural Dye Stole',
    description: 'Eco-friendly stoles dyed with natural plant extracts',
    price: '₹950',
    creator: 'Lakshmi',
    creatorStory: 'Lakshmi mastered the ancient art of natural dyeing, creating vibrant colors from plants and minerals.',
    image: '/images/WhatsApp Image 2026-04-03 at 12.28.20 AM (2).jpeg',
    category: 'Fashion',
  },
  {
    id: 4,
    title: 'Handcrafted Basket',
    description: 'Woven baskets combining functionality with beauty',
    price: '₹600',
    creator: 'Mohan',
    creatorStory: 'Mohan\'s baskets are works of art. Each one is unique, reflecting his creativity and dedication to his craft.',
    image: '/images/WhatsApp Image 2026-04-03 at 12.28.21 AM.jpeg',
    category: 'Handicrafts',
  },
  {
    id: 5,
    title: 'Block Print Cushion Cover',
    description: 'Traditional block printing on premium cotton',
    price: '₹450',
    creator: 'Geeta',
    creatorStory: 'Geeta learned block printing and now creates stunning patterns that blend tradition with modern aesthetics.',
    image: '/images/WhatsApp Image 2026-04-03 at 12.28.21 AM (1).jpeg',
    category: 'Home Decor',
  },
  {
    id: 6,
    title: 'Handmade Paper Products',
    description: 'Eco-friendly paper crafted from recycled materials',
    price: '₹300',
    creator: 'Anil',
    creatorStory: 'Anil pioneered paper-making at Anandwan, turning waste into beautiful, sustainable products.',
    image: '/images/WhatsApp Image 2026-04-03 at 12.28.19 AM (1).jpeg',
    category: 'Stationery',
  },
];

export default function SpecialArtsPage() {
  const [selectedArt, setSelectedArt] = useState<any>(null);

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <div className="absolute inset-0 bg-vintage-paper" />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 font-typewriter text-vintage-stamp hover:text-vintage-sepia transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-6xl md:text-7xl text-vintage-ink mb-6">
              Our Special Arts
            </h1>
            <p className="font-handwritten text-2xl md:text-3xl text-vintage-sepia max-w-3xl mx-auto">
              Every creation carries a story. Every purchase supports a life.
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTWORKS.map((art, index) => (
              <ArtCard
                key={art.id}
                art={art}
                index={index}
                onClick={() => setSelectedArt(art)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedArt && (
        <ProductDetail art={selectedArt} onClose={() => setSelectedArt(null)} />
      )}
    </main>
  );
}

function ArtCard({ art, index, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="letter-card overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-80 bg-gradient-to-br from-vintage-sepia/20 to-vintage-stamp/20 overflow-hidden">
          <img 
            src={art.image} 
            alt={art.title}
            className="w-full h-full object-cover"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="ink-stamp text-xs">{art.category}</span>
          </div>

          {/* Hover Overlay */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-vintage-ink/50 flex items-center justify-center"
          >
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 text-white mx-auto mb-2" />
              <p className="font-handwritten text-white text-xl">View Details</p>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-2xl text-vintage-ink mb-2">
            {art.title}
          </h3>
          <p className="font-typewriter text-sm text-vintage-fade mb-4">
            {art.description}
          </p>

          {/* Price & Creator */}
          <div className="flex items-center justify-between pt-4 border-t border-vintage-sepia/20">
            <span className="font-typewriter text-xl text-vintage-stamp">
              {art.price}
            </span>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-vintage-fade" />
              <span className="font-typewriter text-sm text-vintage-fade">
                by {art.creator}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductDetail({ art, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-vintage-ink/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative min-h-screen py-12 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full"
        >
          <div className="letter-card p-8 md:p-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-vintage-stamp/10 hover:bg-vintage-stamp/20 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-vintage-ink text-xl">×</span>
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="h-96 bg-gradient-to-br from-vintage-sepia/20 to-vintage-stamp/20 rounded-sm overflow-hidden">
                <img 
                  src={art.image} 
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <div className="mb-4">
                  <span className="ink-stamp text-xs">{art.category}</span>
                </div>

                <h2 className="font-serif text-4xl text-vintage-ink mb-4">
                  {art.title}
                </h2>

                <p className="font-typewriter text-vintage-fade mb-6">
                  {art.description}
                </p>

                <div className="mb-8">
                  <p className="font-typewriter text-3xl text-vintage-stamp">
                    {art.price}
                  </p>
                </div>

                {/* Creator Story */}
                <div className="border-t border-vintage-sepia/20 pt-6 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-vintage-stamp" />
                    <h3 className="font-serif text-xl text-vintage-ink">
                      Meet {art.creator}
                    </h3>
                  </div>
                  <p className="font-typewriter text-sm text-vintage-fade leading-relaxed">
                    {art.creatorStory}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-vintage-stamp text-white font-typewriter hover:bg-vintage-sepia transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="px-6 py-4 border-2 border-vintage-stamp text-vintage-stamp hover:bg-vintage-stamp hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
