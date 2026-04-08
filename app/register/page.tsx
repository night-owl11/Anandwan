'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authAPI.register({ name, email, password, role });
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          if (response.user.role === 'volunteer') {
            router.push('/volunteer-dashboard');
          } else if (response.user.role === 'authorizer') {
            router.push('/admin');
          }
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-vintage-paper flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-vintage-ink mb-2">Registration Successful!</h2>
          <p className="font-body text-vintage-sepia">Redirecting to dashboard...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-vintage-paper flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative w-full max-w-md">
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
              Register
            </h1>
            <p className="font-body text-vintage-sepia italic">
              Join the Anandwan community
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
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
              <label className="block font-serif text-sm text-vintage-ink mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vintage-sepia" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

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
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

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
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block font-serif text-sm text-vintage-ink mb-2">
                Register As
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-vintage-paper/50 border-2 border-vintage-fade/30 focus:border-vintage-stamp outline-none transition-colors font-body text-vintage-text"
              >
                <option value="volunteer">Volunteer</option>
                <option value="authorizer">Authorizer (Admin)</option>
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-vintage-stamp hover:bg-vintage-sepia text-white font-serif text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Register</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-vintage-sepia">
              Already have an account?{' '}
              <Link href="/auth" className="text-vintage-stamp hover:underline font-semibold">
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-vintage-stamp/20 text-center">
            <p className="font-body text-sm text-vintage-sepia italic">
              "Join us in preserving the stories of Anandwan"
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
