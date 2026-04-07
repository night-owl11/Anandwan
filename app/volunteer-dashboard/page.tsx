'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VolunteerDashboard() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleLogout = () => {
    router.push('/landing');
  };

  return (
    <main className="min-h-screen bg-vintage-paper">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Header */}
      <div className="relative border-b-2 border-vintage-stamp/20 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl text-vintage-ink">Volunteer Dashboard</h2>
            <p className="font-body text-sm text-vintage-sepia italic">Welcome back</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-vintage-text hover:text-vintage-stamp transition-colors font-serif"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-32 bg-vintage-stamp mx-auto mb-8"
          />
          
          <h1 className="font-serif text-5xl md:text-6xl text-vintage-ink mb-6">
            How would you like to help?
          </h1>
          
          <p className="font-body text-xl text-vintage-sepia max-w-2xl mx-auto italic">
            Your support makes a difference in preserving the stories and supporting the community
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Make a Donation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onMouseEnter={() => setHoveredCard('donate')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => router.push('/payment')}
            className="group cursor-pointer"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative bg-white p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                {/* Corner Decorations */}
                <motion.div 
                  className="absolute top-2 left-2 w-10 h-10 border-t-4 border-l-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'donate' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 w-10 h-10 border-t-4 border-r-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'donate' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-2 left-2 w-10 h-10 border-b-4 border-l-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'donate' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-2 right-2 w-10 h-10 border-b-4 border-r-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'donate' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: hoveredCard === 'donate' ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 rounded-full bg-vintage-stamp/10 flex items-center justify-center mb-6 mx-auto"
                >
                  <Heart className="w-10 h-10 text-vintage-stamp" fill="currentColor" />
                </motion.div>

                {/* Content */}
                <h3 className="font-serif text-3xl text-vintage-ink text-center mb-4 group-hover:text-vintage-stamp transition-colors">
                  Make a Donation
                </h3>
                
                <p className="font-body text-vintage-sepia text-center leading-relaxed mb-6">
                  Support the community directly with a financial contribution that helps sustain Anandwan's mission
                </p>

                {/* Arrow */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      x: hoveredCard === 'donate' ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6 text-vintage-stamp" />
                  </motion.div>
                </div>
              </div>

              {/* Shadow */}
              <motion.div
                className="absolute inset-0 bg-vintage-ink/10 blur-xl -z-10"
                animate={{
                  y: hoveredCard === 'donate' ? 12 : 8,
                  opacity: hoveredCard === 'donate' ? 0.3 : 0.15,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Shop Anandwan's Art */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onMouseEnter={() => setHoveredCard('shop')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => router.push('/marketplace')}
            className="group cursor-pointer"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative bg-white p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                {/* Corner Decorations */}
                <motion.div 
                  className="absolute top-2 left-2 w-10 h-10 border-t-4 border-l-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'shop' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 w-10 h-10 border-t-4 border-r-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'shop' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-2 left-2 w-10 h-10 border-b-4 border-l-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'shop' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-2 right-2 w-10 h-10 border-b-4 border-r-4 border-vintage-stamp"
                  animate={{ opacity: hoveredCard === 'shop' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: hoveredCard === 'shop' ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 rounded-full bg-vintage-sepia/10 flex items-center justify-center mb-6 mx-auto"
                >
                  <ShoppingBag className="w-10 h-10 text-vintage-sepia" />
                </motion.div>

                {/* Content */}
                <h3 className="font-serif text-3xl text-vintage-ink text-center mb-4 group-hover:text-vintage-stamp transition-colors">
                  Shop Anandwan's Art
                </h3>
                
                <p className="font-body text-vintage-sepia text-center leading-relaxed mb-6">
                  Purchase handcrafted items made by the community, supporting their livelihood and celebrating their skills
                </p>

                {/* Arrow */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      x: hoveredCard === 'shop' ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6 text-vintage-stamp" />
                  </motion.div>
                </div>
              </div>

              {/* Shadow */}
              <motion.div
                className="absolute inset-0 bg-vintage-ink/10 blur-xl -z-10"
                animate={{
                  y: hoveredCard === 'shop' ? 12 : 8,
                  opacity: hoveredCard === 'shop' ? 0.3 : 0.15,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 bg-white/80 backdrop-blur-sm border-2 border-vintage-stamp/20">
            <p className="font-serif text-2xl text-vintage-ink italic leading-relaxed">
              "Every contribution, whether through donation or purchase, helps preserve dignity and empower lives at Anandwan"
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
