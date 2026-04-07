const Donation = require('../models/Donation');
const { validationResult } = require('express-validator');

// Generate unique transaction ID
const generateTransactionId = (paymentMethod) => {
  const prefix = paymentMethod === 'UPI' ? 'UPI' : 
                 paymentMethod === 'Card' ? 'CARD' : 'NB';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `${prefix}${timestamp}${random}`;
};

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private (Volunteer only)
exports.createDonation = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { amount, paymentMethod, donorName, donorEmail } = req.body;

    // Generate transaction ID
    const transactionId = generateTransactionId(paymentMethod);

    // Simulate payment processing (in production, integrate with payment gateway)
    // For now, we'll mark it as Success
    const status = 'Success';

    // Create donation
    const donation = await Donation.create({
      userId: req.user._id,
      amount,
      paymentMethod,
      transactionId,
      status,
      donorName,
      donorEmail
    });

    // Populate user details
    await donation.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      donation
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating donation',
      error: error.message
    });
  }
};

// @desc    Get volunteer's own donations
// @route   GET /api/donations/my
// @access  Private (Volunteer only)
exports.getMyDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    const total = await Donation.countDocuments({ userId: req.user._id });

    res.status(200).json({
      success: true,
      count: donations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      donations
    });
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
};

// @desc    Get all donations (Admin only)
// @route   GET /api/donations/all
// @access  Private (Authorizer only)
exports.getAllDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by payment method
    if (req.query.paymentMethod) {
      query.paymentMethod = req.query.paymentMethod;
    }

    // Filter by date range
    if (req.query.startDate || req.query.endDate) {
      query.createdAt = {};
      if (req.query.startDate) {
        query.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        query.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    // Search by name, email, or transaction ID
    if (req.query.search) {
      query.$or = [
        { donorName: { $regex: req.query.search, $options: 'i' } },
        { donorEmail: { $regex: req.query.search, $options: 'i' } },
        { transactionId: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Sort
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort = { [parts[0]]: parts[1] === 'asc' ? 1 : -1 };
    }

    const donations = await Donation.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email role');

    const total = await Donation.countDocuments(query);

    // Calculate statistics
    const stats = await Donation.aggregate([
      { $match: { status: 'Success' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalDonations: { $sum: 1 },
          avgDonation: { $avg: '$amount' }
        }
      }
    ]);

    const uniqueVolunteers = await Donation.distinct('userId', { status: 'Success' });

    res.status(200).json({
      success: true,
      count: donations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      statistics: {
        totalAmount: stats[0]?.totalAmount || 0,
        totalDonations: stats[0]?.totalDonations || 0,
        avgDonation: Math.round(stats[0]?.avgDonation || 0),
        uniqueVolunteers: uniqueVolunteers.length
      },
      donations
    });
  } catch (error) {
    console.error('Get all donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
};

// @desc    Get single donation by ID
// @route   GET /api/donations/:id
// @access  Private
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('userId', 'name email role');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'authorizer' && donation.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this donation'
      });
    }

    res.status(200).json({
      success: true,
      donation
    });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation',
      error: error.message
    });
  }
};
