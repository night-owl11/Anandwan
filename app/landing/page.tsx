'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import StoriesSection from '@/components/landing/StoriesSection';
import TimelineSection from '@/components/landing/TimelineSection';
import WorkSection from '@/components/landing/WorkSection';
import WhyItMatters from '@/components/landing/WhyItMatters';
import ContactSection from '@/components/landing/ContactSection';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative bg-vintage-paper overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Vignette Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-vintage-ink/30" />
      </div>

      {/* Hero Section */}
      <HeroSection mousePosition={mousePosition} />

      {/* Stories Section */}
      <div id="stories">
        <StoriesSection />
      </div>

      {/* Timeline Section */}
      <div id="journey">
        <TimelineSection />
      </div>

      {/* Work Section */}
      <div id="arts">
        <WorkSection />
      </div>

      {/* Why It Matters */}
      <WhyItMatters />

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-vintage-stamp origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  );
}
