'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-vintage-paper to-vintage-paper/50 overflow-hidden">
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
            Get in Touch
          </h2>
          
          <p className="font-body text-body text-vintage-text max-w-3xl mx-auto leading-relaxed">
            Have questions? Want to visit? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative p-8 bg-white/80 backdrop-blur-sm border-l-4 border-vintage-stamp shadow-lg">
              <h3 className="font-serif text-h3 text-vintage-ink mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-vintage-stamp/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-vintage-stamp" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-vintage-ink mb-1">Address</h4>
                    <p className="font-body text-body-sm text-vintage-text">
                      Anandwan, Warora<br />
                      District Chandrapur, Maharashtra<br />
                      India - 442907
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-vintage-stamp/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-vintage-stamp" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-vintage-ink mb-1">Phone</h4>
                    <p className="font-body text-body-sm text-vintage-text">
                      +91 [phone number]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-vintage-stamp/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-vintage-stamp" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-vintage-ink mb-1">Email</h4>
                    <p className="font-body text-body-sm text-vintage-text">
                      contact@anandwan.org
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative p-8 bg-gradient-to-br from-vintage-stamp/10 to-vintage-sepia/10 border-4 border-vintage-stamp/30">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-vintage-stamp" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-vintage-stamp" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-vintage-stamp" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-vintage-stamp" />
              
              <p className="font-serif text-xl text-vintage-ink leading-relaxed italic">
                "Every connection brings us closer to ensuring no story goes unseen."
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="relative p-8 bg-white/80 backdrop-blur-sm shadow-lg">
              <h3 className="font-serif text-h3 text-vintage-ink mb-6">
                Send us a Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-serif text-sm text-vintage-ink mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif text-sm text-vintage-ink mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif text-sm text-vintage-ink mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-vintage-stamp hover:bg-vintage-sepia text-white font-serif text-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
