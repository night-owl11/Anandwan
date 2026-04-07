'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Heart, Shield, Lock, CreditCard, Smartphone, Building2, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DONATION_AMOUNTS = [
  { value: 100, impact: 'Provides meals for 2 people' },
  { value: 500, impact: 'Supports a day of medical care' },
  { value: 1000, impact: 'Funds educational materials for 5 children' },
  { value: 5000, impact: 'Helps sustain a family for a month' },
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', icon: CreditCard, description: 'Debit / Credit Card' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, description: 'All major banks' },
];

export default function PaymentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'amount' | 'payment' | 'success'>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;
  const selectedImpact = DONATION_AMOUNTS.find(a => a.value === selectedAmount)?.impact || 'Makes a meaningful difference';

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    setCustomAmount(numValue);
    setSelectedAmount(null);
  };

  const handleContinueToPayment = () => {
    if (finalAmount >= 10) {
      setStep('payment');
    }
  };

  const handlePayment = async () => {
    if (!selectedPayment || !donorName || !donorEmail) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-vintage-paper via-white to-vintage-paper/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Header */}
      <div className="relative border-b border-vintage-stamp/10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <button
            onClick={() => step === 'payment' ? setStep('amount') : router.push('/volunteer-dashboard')}
            className="flex items-center gap-2 text-vintage-text hover:text-vintage-stamp transition-colors font-serif"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2 text-vintage-stamp">
            <Shield className="w-5 h-5" />
            <span className="font-serif text-sm">100% Secure</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'amount' && (
          <motion.div
            key="amount"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-4xl mx-auto px-4 py-12"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-vintage-stamp/10 flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="w-10 h-10 text-vintage-stamp" fill="currentColor" />
              </motion.div>
              
              <h1 className="font-serif text-4xl md:text-5xl text-vintage-ink mb-4">
                Make a Difference Today
              </h1>
              <p className="font-body text-lg text-vintage-sepia max-w-2xl mx-auto">
                Your contribution directly supports the community at Anandwan
              </p>
            </div>

            {/* Donation Amount Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h2 className="font-serif text-2xl text-vintage-ink mb-6">Choose Amount</h2>
              
              {/* Predefined Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {DONATION_AMOUNTS.map((amount) => (
                  <motion.button
                    key={amount.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAmountSelect(amount.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedAmount === amount.value
                        ? 'border-vintage-stamp bg-vintage-stamp/5 shadow-lg'
                        : 'border-vintage-sepia/20 hover:border-vintage-stamp/50'
                    }`}
                  >
                    <div className="font-serif text-3xl text-vintage-ink mb-2">
                      ₹{amount.value}
                    </div>
                    <div className="font-body text-xs text-vintage-fade leading-tight">
                      {amount.impact}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div>
                <label className="font-serif text-sm text-vintage-text mb-2 block">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-2xl text-vintage-text">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-4 border-2 border-vintage-sepia/20 rounded-xl font-serif text-2xl text-vintage-ink focus:border-vintage-stamp focus:outline-none transition-colors"
                  />
                </div>
                {customAmount && parseInt(customAmount) < 10 && (
                  <p className="text-red-600 text-sm mt-2 font-body">Minimum donation amount is ₹10</p>
                )}
              </div>

              {/* Impact Message */}
              {finalAmount >= 10 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-vintage-stamp/5 rounded-xl border border-vintage-stamp/20"
                >
                  <p className="font-body text-vintage-ink text-center">
                    <span className="font-semibold">₹{finalAmount}</span> {selectedImpact}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: finalAmount >= 10 ? 1.02 : 1 }}
              whileTap={{ scale: finalAmount >= 10 ? 0.98 : 1 }}
              onClick={handleContinueToPayment}
              disabled={finalAmount < 10}
              className={`w-full py-5 rounded-xl font-serif text-lg transition-all duration-300 ${
                finalAmount >= 10
                  ? 'bg-vintage-stamp text-white hover:bg-vintage-sepia shadow-lg hover:shadow-xl'
                  : 'bg-vintage-sepia/20 text-vintage-fade cursor-not-allowed'
              }`}
            >
              Continue to Payment
            </motion.button>

            {/* Trust Signals */}
            <div className="mt-8 flex items-center justify-center gap-6 text-vintage-fade">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="font-body text-sm">Encrypted & सुरक्षित</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="font-body text-sm">100% Secure Payment</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-4xl mx-auto px-4 py-12"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl text-vintage-ink mb-2">
                Complete Your Donation
              </h1>
              <p className="font-body text-lg text-vintage-sepia">
                You're donating <span className="font-semibold text-vintage-stamp">₹{finalAmount}</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  {/* Donor Details */}
                  <div className="mb-8">
                    <h2 className="font-serif text-xl text-vintage-ink mb-4">Your Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="font-body text-sm text-vintage-text mb-2 block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 border-2 border-vintage-sepia/20 rounded-lg font-body text-vintage-ink focus:border-vintage-stamp focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-body text-sm text-vintage-text mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border-2 border-vintage-sepia/20 rounded-lg font-body text-vintage-ink focus:border-vintage-stamp focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h2 className="font-serif text-xl text-vintage-ink mb-4">Payment Method</h2>
                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;
                        return (
                          <motion.button
                            key={method.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                              selectedPayment === method.id
                                ? 'border-vintage-stamp bg-vintage-stamp/5 shadow-md'
                                : 'border-vintage-sepia/20 hover:border-vintage-stamp/50'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              selectedPayment === method.id ? 'bg-vintage-stamp/10' : 'bg-vintage-sepia/5'
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                selectedPayment === method.id ? 'text-vintage-stamp' : 'text-vintage-text'
                              }`} />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-serif text-lg text-vintage-ink">{method.label}</div>
                              <div className="font-body text-sm text-vintage-fade">{method.description}</div>
                            </div>
                            {selectedPayment === method.id && (
                              <Check className="w-6 h-6 text-vintage-stamp" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pay Button */}
                  <motion.button
                    whileHover={{ scale: (!donorName || !donorEmail || !selectedPayment || isProcessing) ? 1 : 1.02 }}
                    whileTap={{ scale: (!donorName || !donorEmail || !selectedPayment || isProcessing) ? 1 : 0.98 }}
                    onClick={handlePayment}
                    disabled={!donorName || !donorEmail || !selectedPayment || isProcessing}
                    className={`w-full mt-8 py-5 rounded-xl font-serif text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      donorName && donorEmail && selectedPayment && !isProcessing
                        ? 'bg-vintage-stamp text-white hover:bg-vintage-sepia shadow-lg hover:shadow-xl'
                        : 'bg-vintage-sepia/20 text-vintage-fade cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay ₹{finalAmount}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                  <h3 className="font-serif text-lg text-vintage-ink mb-4">Donation Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between font-body text-vintage-text">
                      <span>Amount</span>
                      <span className="font-semibold">₹{finalAmount}</span>
                    </div>
                    <div className="border-t border-vintage-sepia/20 pt-3">
                      <div className="flex justify-between font-serif text-lg text-vintage-ink">
                        <span>Total</span>
                        <span className="font-bold">₹{finalAmount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-vintage-stamp/5 rounded-lg border border-vintage-stamp/20">
                    <p className="font-body text-sm text-vintage-ink leading-relaxed">
                      {selectedImpact}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-vintage-sepia/20">
                    <p className="font-body text-xs text-vintage-fade text-center leading-relaxed">
                      Your contribution directly helps those in need at Anandwan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-2xl mx-auto px-4 py-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-serif text-4xl text-vintage-ink mb-4"
              >
                Thank You for Making a Difference ❤️
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-body text-lg text-vintage-sepia mb-8"
              >
                Your donation of <span className="font-semibold text-vintage-stamp">₹{finalAmount}</span> has been received successfully
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-vintage-stamp/5 rounded-xl border border-vintage-stamp/20 mb-8"
              >
                <p className="font-body text-vintage-ink leading-relaxed">
                  A confirmation email has been sent to <span className="font-semibold">{donorEmail}</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <button
                  onClick={() => router.push('/volunteer-dashboard')}
                  className="w-full py-4 bg-vintage-stamp text-white rounded-xl font-serif text-lg hover:bg-vintage-sepia transition-colors"
                >
                  Return to Dashboard
                </button>
                <button
                  onClick={() => router.push('/landing')}
                  className="w-full py-4 border-2 border-vintage-stamp text-vintage-stamp rounded-xl font-serif text-lg hover:bg-vintage-stamp/5 transition-colors"
                >
                  Back to Home
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
