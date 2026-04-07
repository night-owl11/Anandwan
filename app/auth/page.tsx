'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      router.push('/volunteer-dashboard');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-vintage-paper flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Link */}
        <Link 
          href="/landing"
          className="inline-flex items-center gap-2 mb-8 text-vintage-text hover:text-vintage-stamp transition-colors font-serif"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white p-10 shadow-2xl"
        >
          {/* Corner Decorations */}
          <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-vintage-stamp" />
          <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-vintage-stamp" />
          <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-vintage-stamp" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-vintage-stamp" />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 w-24 bg-vintage-stamp mx-auto mb-6"
            />
            
            <h1 className="font-serif text-4xl text-vintage-ink mb-3">
              Volunteer Login
            </h1>
            <p className="font-body text-vintage-sepia italic">
              Support Anandwan through your contribution
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block font-serif text-sm text-vintage-ink mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vintage-sepia" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text"
                  placeholder="volunteer@anandwan.org"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-serif text-sm text-vintage-ink mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vintage-sepia" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-vintage-stamp hover:bg-vintage-sepia text-white font-serif text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t-2 border-vintage-stamp/20 text-center">
            <p className="font-body text-sm text-vintage-sepia italic">
              "Every contribution helps preserve the stories of Anandwan"
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
