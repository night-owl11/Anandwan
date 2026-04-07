const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [10, 'Minimum donation amount is ₹10']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['UPI', 'Card', 'Net Banking']
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction ID is required'],
    unique: true
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Pending'
  },
  donorName: {
    type: String,
    required: true
  },
  donorEmail: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
donationSchema.index({ userId: 1, createdAt: -1 });
donationSchema.index({ status: 1 });
donationSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Donation', donationSchema);
