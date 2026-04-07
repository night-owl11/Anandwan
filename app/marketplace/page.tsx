'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Heart, User } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Handwoven Cotton Kurta',
    price: '₹1,200',
    creator: 'Meera',
    creatorStory: 'Meera found her purpose through weaving. Each thread tells her story of resilience.',
  },
  {
    id: 2,
    name: 'Embroidered Table Runner',
    price: '₹800',
    creator: 'Rajesh',
    creatorStory: 'Rajesh\'s hands create beauty. His embroidery work supports his family and inspires others.',
  },
  {
    id: 3,
    name: 'Natural Dye Stole',
    price: '₹950',
    creator: 'Lakshmi',
    creatorStory: 'Lakshmi mastered natural dyeing techniques, bringing ancient art to modern life.',
  },
  {
    id: 4,
    name: 'Handcrafted Pottery Set',
    price: '₹1,500',
    creator: 'Ramesh',
    creatorStory: 'Ramesh shapes clay into art. His pottery reflects years of dedication and skill.',
  },
  {
    id: 5,
    name: 'Traditional Basket Weave',
    price: '₹650',
    creator: 'Sunita',
    creatorStory: 'Sunita weaves tradition into every basket. Her craft sustains her family with pride.',
  },
  {
    id: 6,
    name: 'Handmade Textile Art',
    price: '₹2,000',
    creator: 'Prakash',
    creatorStory: 'Prakash creates textile masterpieces. Each piece carries the soul of Anandwan.',
  },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl text-vintage-ink mb-4">
            Buy With Purpose
          </h1>
          <p className="font-handwritten text-2xl text-vintage-sepia max-w-2xl mx-auto">
            Every purchase supports a real person, a real skill, a real transformation
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ product, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="letter-card overflow-hidden group cursor-pointer"
    >
      {/* Product Image Placeholder */}
      <div className="h-80 bg-vintage-sepia/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vintage-ink/30" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-serif text-2xl text-vintage-ink mb-2">
          {product.name}
        </h3>
        <p className="font-serif text-xl text-vintage-stamp font-semibold mb-4">
          {product.price}
        </p>

        {/* Creator Info */}
        <div className="border-t border-vintage-sepia/20 pt-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-vintage-stamp" />
            <span className="font-serif text-sm text-vintage-text font-medium">
              Created by {product.creator}
            </span>
          </div>
          <p className="font-body text-sm text-vintage-fade leading-relaxed italic">
            {product.creatorStory}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-vintage-stamp text-white font-serif text-sm hover:bg-vintage-sepia transition-colors shadow-md hover:shadow-lg">
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
          <button className="px-4 py-3 border-2 border-vintage-stamp text-vintage-stamp hover:bg-vintage-stamp hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
