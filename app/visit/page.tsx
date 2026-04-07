'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';

export default function VisitPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="letter-card p-8 md:p-12"
        >
          <h1 className="font-serif text-5xl text-vintage-ink mb-6">
            Visit Anandwan
          </h1>
          
          <p className="font-handwritten text-2xl text-vintage-sepia mb-8 leading-relaxed">
            Experience the journey yourself. Walk through the workshops, meet the artisans, 
            witness transformation in action.
          </p>

          <div className="space-y-6 font-typewriter">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-vintage-stamp flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-vintage-ink mb-1">Location</h3>
                <p className="text-vintage-fade">
                  Anandwan, Warora<br />
                  District Chandrapur, Maharashtra<br />
                  India - 442907
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-vintage-stamp flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-vintage-ink mb-1">Contact</h3>
                <p className="text-vintage-fade">
                  +91 [phone_number]
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-vintage-stamp flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-vintage-ink mb-1">Email</h3>
                <p className="text-vintage-fade">
                  [email]@anandwan.in
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-vintage-stamp flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-vintage-ink mb-1">Visiting Hours</h3>
                <p className="text-vintage-fade">
                  Monday - Saturday: 9:00 AM - 5:00 PM<br />
                  Sunday: Closed<br />
                  <span className="text-xs">Prior appointment recommended</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-vintage-sepia/20">
            <button className="w-full md:w-auto px-8 py-4 bg-vintage-stamp text-white font-typewriter hover:bg-vintage-sepia transition-colors">
              Schedule Your Visit
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
