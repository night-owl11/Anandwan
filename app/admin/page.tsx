'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Filter, Download, Calendar, CreditCard,
  Smartphone, Building2, Check, X, Clock, ChevronDown,
  ChevronUp, Eye, Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { donationAPI, isAuthenticated, hasRole } from '@/lib/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth');
      return;
    }
    if (!hasRole('authorizer')) {
      router.push('/landing');
      return;
    }
    fetchDonations();
  }, [router]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await donationAPI.getAllDonations({
        page: 1,
        limit: 100,
        search: searchQuery
      });
      if (response.success) {
        setDonations(response.donations || []);
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error.message.includes('authorized')) {
        router.push('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated() && hasRole('authorizer')) {
        fetchDonations();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredDonations = donations.filter(donation => {
    const query = searchQuery.toLowerCase();
    return (
      donation.donorName?.toLowerCase().includes(query) ||
      donation.donorEmail?.toLowerCase().includes(query) ||
      donation.transactionId?.toLowerCase().includes(query)
    );
  });

  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (!sortField) return 0;
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'createdAt') {
      aVal = new Date(a.createdAt).getTime();
      bVal = new Date(b.createdAt).getTime();
    }
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getPaymentIcon = (method: string) => {
    if (method === 'UPI') return <Smartphone className="w-4 h-4" />;
    if (method === 'Card') return <CreditCard className="w-4 h-4" />;
    return <Building2 className="w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      Success: 'bg-green-100 text-green-700 border-green-200',
      Failed: 'bg-red-100 text-red-700 border-red-200',
      Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    const icons: any = {
      Success: <Check className="w-3 h-3" />,
      Failed: <X className="w-3 h-3" />,
      Pending: <Clock className="w-3 h-3" />,
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-vintage-paper via-white to-vintage-paper/50">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #704214 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative border-b border-vintage-stamp/10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/landing')}
                className="flex items-center gap-2 text-vintage-text hover:text-vintage-stamp transition-colors font-serif"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-8 w-px bg-vintage-sepia/20" />
              <div>
                <h1 className="font-serif text-2xl text-vintage-ink">Donation Dashboard</h1>
                <p className="font-body text-sm text-vintage-fade">Anandwan Authorizer Portal</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-vintage-stamp text-white rounded-lg font-serif text-sm hover:bg-vintage-sepia transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-vintage-stamp/10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vintage-fade" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or transaction ID..."
                className="w-full pl-12 pr-4 py-3 border-2 border-vintage-sepia/20 rounded-lg font-body text-vintage-ink focus:border-vintage-stamp focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-vintage-stamp text-vintage-stamp rounded-lg font-serif hover:bg-vintage-stamp/5 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-vintage-stamp/10"
        >
          <div className="p-6 border-b border-vintage-sepia/20">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-vintage-ink">Transaction History</h2>
              <p className="font-body text-sm text-vintage-fade">
                {loading ? 'Loading...' : `Showing ${sortedDonations.length} transactions`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-vintage-stamp animate-spin mb-4" />
              <p className="font-body text-vintage-fade">Loading donations...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-vintage-paper/30">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <button onClick={() => handleSort('donorName')} className="flex items-center gap-2 font-serif text-sm text-vintage-text">
                        Volunteer
                        {sortField === 'donorName' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button onClick={() => handleSort('amount')} className="flex items-center gap-2 font-serif text-sm text-vintage-text">
                        Amount
                        {sortField === 'amount' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left font-serif text-sm text-vintage-text">Date & Time</th>
                    <th className="px-6 py-4 text-left font-serif text-sm text-vintage-text">Payment Method</th>
                    <th className="px-6 py-4 text-left font-serif text-sm text-vintage-text">Transaction ID</th>
                    <th className="px-6 py-4 text-left font-serif text-sm text-vintage-text">Status</th>
                    <th className="px-6 py-4 text-left font-serif text-sm text-vintage-text">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDonations.map((donation, index) => (
                    <tr key={donation._id || index} className="border-b border-vintage-sepia/10 hover:bg-vintage-paper/20">
                      <td className="px-6 py-4">
                        <p className="font-serif text-sm text-vintage-ink font-medium">{donation.donorName}</p>
                        <p className="font-body text-xs text-vintage-fade">{donation.donorEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-serif text-base text-vintage-ink font-semibold">₹{donation.amount.toLocaleString('en-IN')}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm text-vintage-text">{formatDate(donation.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getPaymentIcon(donation.paymentMethod)}
                          <span className="font-body text-sm text-vintage-text">{donation.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-mono text-xs text-vintage-fade">{donation.transactionId}</p>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(donation.status)}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => setSelectedDonation(donation)} className="flex items-center gap-1 text-vintage-stamp hover:text-vintage-sepia">
                          <Eye className="w-4 h-4" />
                          <span className="font-body text-sm">View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sortedDonations.length === 0 && (
                <div className="p-12 text-center">
                  <p className="font-body text-vintage-fade">No donations found</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {selectedDonation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDonation(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-2xl text-vintage-ink mb-6">Transaction Details</h2>
            <div className="space-y-4">
              <div><label className="font-body text-sm text-vintage-fade">Name:</label><p className="font-serif text-lg">{selectedDonation.donorName}</p></div>
              <div><label className="font-body text-sm text-vintage-fade">Email:</label><p className="font-body text-sm">{selectedDonation.donorEmail}</p></div>
              <div><label className="font-body text-sm text-vintage-fade">Amount:</label><p className="font-serif text-2xl text-vintage-stamp">₹{selectedDonation.amount}</p></div>
              <div><label className="font-body text-sm text-vintage-fade">Transaction ID:</label><p className="font-mono text-sm">{selectedDonation.transactionId}</p></div>
            </div>
            <button onClick={() => setSelectedDonation(null)} className="mt-6 w-full py-3 bg-vintage-stamp text-white rounded-lg font-serif">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
