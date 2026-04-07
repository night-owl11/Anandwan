'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'stories', label: 'Stories', type: 'scroll' },
  { id: 'journey', label: 'Journey', type: 'scroll' },
  { id: 'arts', label: 'Arts', type: 'scroll' },
  { id: 'contact', label: 'Contact', type: 'scroll' },
  { id: 'gallery', label: 'Gallery', type: 'link', href: '/gallery' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Detect active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(NAV_ITEMS[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, type: string, href?: string) => {
    if (type === 'link' && href) {
      window.location.href = href;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-vintage-paper/95 backdrop-blur-md shadow-lg' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-center gap-8">
          {NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              onClick={() => scrollToSection(item.id, item.type, item.href)}
              className={`font-serif text-sm font-medium transition-all duration-300 relative group ${
                isScrolled
                  ? activeSection === item.id
                    ? 'text-vintage-stamp'
                    : 'text-vintage-text hover:text-vintage-stamp'
                  : activeSection === item.id
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
              
              {/* Underline animation */}
              <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-vintage-stamp' : 'bg-white'
              } ${
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
