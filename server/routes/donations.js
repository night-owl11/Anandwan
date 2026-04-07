const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const donationController = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');

// Validation middleware
const donationValidation = [
  body('amount').isNumeric().withMessage('Amount must be a number').custom(value => {
    if (value < 10) {
      throw new Error('Minimum donation amount is ₹10');
    }
    return true;
  }),
  body('paymentMethod').isIn(['UPI', 'Card', 'Net Banking']).withMessage('Invalid payment method'),
  body('donorName').trim().notEmpty().withMessage('Donor name is required'),
  body('donorEmail').isEmail().withMessage('Valid email is required')
];

// Routes
router.post('/', protect, authorize('volunteer'), donationValidation, donationController.createDonation);
router.get('/my', protect, authorize('volunteer'), donationController.getMyDonations);
router.get('/all', protect, authorize('authorizer'), donationController.getAllDonations);
router.get('/:id', protect, donationController.getDonationById);

module.exports = router;
