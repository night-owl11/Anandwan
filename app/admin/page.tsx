'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowLeft, TrendingUp, Users, DollarSign, Activity,
  Search, Filter, Download, Calendar, CreditCard,
  Smartphone, Building2, Check, X, Clock, ChevronDown,
  ChevronUp, Eye, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Dummy data for demonstration
const DUMMY_DONATIONS = [
  {
    id: 'TXN001',
    volunteerName: 'Priya Sharma',
    volunteerEmail: 'priya@email.com',
    amount: 5000,
    date: '2026-04-07T10:30:00',
    paymentMethod: 'UPI',
    status: 'Success',
    transactionId: 'UPI2026040712345',
  },
  {
    id: 'TXN002',
    volunteerName: 'Rahul Verma',
    volunteerEmail: 'rahul@email.com',
    amount: 1000,
    date: '2026-04-06T14:20:00',
    paymentMethod: 'Card',
    status: 'Success',
    transactionId: 'CARD2026040698765',
  },
  {
    id: 'TXN003',
    volunteerName: 'Anjali Patel',
    volunteerEmail: 'anjali@email.com',
    amount: 500,
    date: '2026-04-06T09:15:00',
    paymentMethod: 'UPI',
    status: 'Success',
    transactionId: 'UPI2026040654321',
  },
  {
    id: 'TXN004',
    volunteerName: 'Vikram Singh',
    volunteerEmail: 'vikram@email.com',
    amount: 2000,
    date: '2026-04-05T16:45:00',
    paymentMethod: 'Net Banking',
    status: 'Success',
    transactionId: 'NB2026040511111',
  },
  {
    id: 'TXN005',
    volunteerName: 'Sneha Reddy',
    volunteerEmail: 'sneha@email.com',
    amount: 10000,
    date: '2026-04-05T11:30:00',
    paymentMethod: 'UPI',
    status: 'Success',
    transactionId: 'UPI2026040522222',
  },
  {
    id: 'TXN006',
    volunteerName: 'Amit Kumar',
    volunteerEmail: 'amit@email.com',
    amount: 1500,
    date: '2026-04-04T13:00:00',
    paymentMethod: 'Card',
    status: 'Failed',
    transactionId: 'CARD2026040433333',
  },
  {
    id: 'TXN007',
    volunteerName: 'Meera Joshi',
    volunteerEmail: 'meera@email.com',
    amount: 3000,
    date: '2026-04-04T08:20:00',
    paymentMethod: 'UPI',
    status: 'Success',
    transactionId: 'UPI2026040444444',
  },
  {
    id: 'TXN008',
    volunteerName: 'Rajesh Gupta',
    volunteerEmail: 'rajesh@email.com',
    amount: 500,
    date: '2026-04-03T15:10:00',
    paymentMethod: 'UPI',
    status: 'Success',
    transactionId: 'UPI2026040355555',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [donations, setDonations] = useState(DUMMY_DONATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.volunteerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Sort
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal = a[sortField as keyof typeof a];
    let bVal = b[sortField as keyof typeof b];
    
    if (sortField === 'date') {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'UPI': return <Smartphone className="w-4 h-4" />;
      case 'Card': return <CreditCard className="w-4 h-4" />;
      case 'Net Banking': return <Building2 className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Success: 'bg-green-100 text-green-700 border-green-200',
      Failed: 'bg-red-100 text-red-700 border-red-200',
      Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    
    const icons = {
      Success: <Check className="w-3 h-3" />,
      Failed: <X className="w-3 h-3" />,
      Pending: <Clock className="w-3 h-3" />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status}
      </span>
    );
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

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-vintage-sepia/20 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="font-body text-sm text-vintage-text mb-2 block">Date Range</label>
                <div className="flex items-center gap-2 px-4 py-2 border-2 border-vintage-sepia/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-vintage-fade" />
                  <input type="date" className="flex-1 font-body text-sm focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="font-body text-sm text-vintage-text mb-2 block">Payment Method</label>
                <select className="w-full px-4 py-2 border-2 border-vintage-sepia/20 rounded-lg font-body text-sm focus:border-vintage-stamp focus:outline-none">
                  <option>All Methods</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Net Banking</option>
                </select>
              </div>
              
              <div>
                <label className="font-body text-sm text-vintage-text mb-2 block">Status</label>
                <select className="w-full px-4 py-2 border-2 border-vintage-sepia/20 rounded-lg font-body text-sm focus:border-vintage-stamp focus:outline-none">
                  <option>All Status</option>
                  <option>Success</option>
                  <option>Failed</option>
                  <option>Pending</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-vintage-stamp/10"
        >
          <div className="p-6 border-b border-vintage-sepia/20">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-vintage-ink">Transaction History</h2>
              <p className="font-body text-sm text-vintage-fade">
                Showing {sortedDonations.length} of {donations.length} transactions
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-vintage-paper/30 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('volunteerName')}
                      className="flex items-center gap-2 font-serif text-sm text-vintage-text hover:text-vintage-stamp transition-colors"
                    >
                      Volunteer
                      {sortField === 'volunteerName' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('amount')}
                      className="flex items-center gap-2 font-serif text-sm text-vintage-text hover:text-vintage-stamp transition-colors"
                    >
                      Amount
                      {sortField === 'amount' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-2 font-serif text-sm text-vintage-text hover:text-vintage-stamp transition-colors"
                    >
                      Date & Time
                      {sortField === 'date' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-serif text-sm text-vintage-text">Payment Method</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-serif text-sm text-vintage-text">Transaction ID</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-serif text-sm text-vintage-text">Status</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-serif text-sm text-vintage-text">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDonations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`border-b border-vintage-sepia/10 hover:bg-vintage-paper/20 transition-colors ${
                      donation.amount >= 5000 ? 'bg-vintage-stamp/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-serif text-sm text-vintage-ink font-medium">{donation.volunteerName}</p>
                        <p className="font-body text-xs text-vintage-fade">{donation.volunteerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-serif text-base text-vintage-ink font-semibold">
                        ₹{donation.amount.toLocaleString('en-IN')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-sm text-vintage-text">{formatDate(donation.date)}</p>
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
                    <td className="px-6 py-4">
                      {getStatusBadge(donation.status)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="flex items-center gap-1 text-vintage-stamp hover:text-vintage-sepia transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="font-body text-sm">View</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedDonations.length === 0 && (
            <div className="p-12 text-center">
              <p className="font-body text-vintage-fade">No donations found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-vintage-stamp/20 text-center"
        >
          <p className="font-serif text-lg text-vintage-ink italic">
            All donations are securely recorded and verified for complete transparency
          </p>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedDonation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDonation(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-vintage-ink">Transaction Details</h2>
              <button
                onClick={() => setSelectedDonation(null)}
                className="w-8 h-8 rounded-full hover:bg-vintage-sepia/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-vintage-text" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-vintage-fade mb-1 block">Volunteer Name</label>
                  <p className="font-serif text-lg text-vintage-ink">{selectedDonation.volunteerName}</p>
                </div>
                <div>
                  <label className="font-body text-sm text-vintage-fade mb-1 block">Email</label>
                  <p className="font-body text-sm text-vintage-ink">{selectedDonation.volunteerEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-vintage-fade mb-1 block">Amount</label>
                  <p className="font-serif text-2xl text-vintage-stamp font-bold">
                    ₹{selectedDonation.amount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <label className="font-body text-sm text-vintage-fade mb-1 block">Status</label>
                  <div className="mt-2">{getStatusBadge(selectedDonation.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm text-vintage-fade mb-1 block">Date & Time</label>
                  <p className="font-body text-sm text-vintage-ink">{formatDate(selectedDonation.date)}</p>
                </div>
                <div>
                  <label className="font-body text-sm text-vintage-fade mb-1 block">Payment Method</label>
                  <div className="flex items-center gap-2 mt-2">
                    {getPaymentIcon(selectedDonation.paymentMethod)}
                    <span className="font-body text-sm text-vintage-ink">{selectedDonation.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-body text-sm text-vintage-fade mb-1 block">Transaction ID</label>
                <p className="font-mono text-sm text-vintage-ink bg-vintage-paper/30 px-4 py-2 rounded-lg">
                  {selectedDonation.transactionId}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-1 py-3 bg-vintage-stamp text-white rounded-lg font-serif hover:bg-vintage-sepia transition-colors">
                Download Receipt
              </button>
              <button
                onClick={() => setSelectedDonation(null)}
                className="flex-1 py-3 border-2 border-vintage-stamp text-vintage-stamp rounded-lg font-serif hover:bg-vintage-stamp/5 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
