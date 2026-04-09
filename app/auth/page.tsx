'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/lib/api';

// 1. This is your existing logic, moved to a sub-component
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role'); 
  const isAuthorizer = roleParam === 'authorizer';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        if (response.user.role === 'volunteer') {
          router.push('/volunteer-dashboard');
        } else if (response.user.role === 'authorizer') {
          router.push('/admin');
        } else {
          router.push('/volunteer-dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Back Link */}
      <Link 
        href="/landing"
        className="inline-flex items-center gap-2 mb-8 text-vintage-text hover:text-vintage-stamp transition-colors font-serif"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Home
      </Link>

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

        <div className="text-center mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-24 bg-vintage-stamp mx-auto mb-6"
          />
          <h1 className="font-serif text-4xl text-vintage-ink mb-3">
            {isAuthorizer ? 'Authorizer Login' : 'Volunteer Login'}
          </h1>
          <p className="font-body text-vintage-sepia italic">
            {isAuthorizer 
              ? 'Manage and oversee Anandwan operations' 
              : 'Support Anandwan through your contribution'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-red-800">{error}</p>
            </motion.div>
          )}

          <div>
            <label className="block font-serif text-sm text-vintage-ink mb-2">Email Address</label>
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

          <div>
            <label className="block font-serif text-sm text-vintage-ink mb-2">Password</label>
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

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-vintage-stamp hover:bg-vintage-sepia text-white font-serif text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? <span>Logging in...</span> : <><p>Continue</p><ArrowRight className="w-5 h-5" /></>}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-body text-sm text-vintage-sepia">
            Don't have an account?{' '}
            <Link href="/register" className="text-vintage-stamp hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-vintage-stamp/20 text-center">
          <p className="font-body text-sm text-vintage-sepia italic">
            "Every contribution helps preserve the stories of Anandwan"
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// 2. This is the main page component that Vercel looks for
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-vintage-paper flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* This Suspense boundary fixes the Vercel error */}
      <Suspense fallback={<div className="text-vintage-sepia font-serif">Loading Anandwan Portal...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
