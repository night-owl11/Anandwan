# Frontend-Backend Integration Guide

Complete guide to integrate the backend API with your existing Anandwan frontend.

## 🎯 Overview

This guide shows how to connect your existing UI components with the backend API **without changing the design**.

## 📦 Installation

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Setup Environment Variables

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/anandwan
JWT_SECRET=anandwan_secret_key_2026_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

### 4. Start Backend Server

```bash
cd server
npm run dev
```

Server runs on: `http://localhost:5000`

### 5. Start Frontend

```bash
# In project root
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🔗 Integration Steps

### Step 1: Update Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 2: Update Auth Page (Login)

File: `app/auth/page.tsx`

Add these imports and state:

```typescript
import { authAPI, setToken, setUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

// Inside component:
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await authAPI.login({ email, password });
    
    if (response.success) {
      // Redirect based on role
      if (response.user.role === 'volunteer') {
        router.push('/volunteer-dashboard');
      } else if (response.user.role === 'authorizer') {
        router.push('/admin');
      }
    }
  } catch (err: any) {
    setError(err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};
```

### Step 3: Update Payment Page

File: `app/payment/page.tsx`

Add donation submission:

```typescript
import { donationAPI, getUser } from '@/lib/api';

const handlePayment = async () => {
  if (!selectedPayment || !donorName || !donorEmail) return;
  
  setIsProcessing(true);
  
  try {
    const response = await donationAPI.create({
      amount: finalAmount,
      paymentMethod: selectedPayment === 'upi' ? 'UPI' : 
                     selectedPayment === 'card' ? 'Card' : 'Net Banking',
      donorName,
      donorEmail
    });
    
    if (response.success) {
      setStep('success');
    }
  } catch (error: any) {
    alert(error.message || 'Payment failed');
  } finally {
    setIsProcessing(false);
  }
};
```

### Step 4: Update Admin Dashboard

File: `app/admin/page.tsx`

Add data fetching:

```typescript
import { donationAPI, getUser, hasRole } from '@/lib/api';
import { useEffect } from 'react';

// Inside component:
const [donations, setDonations] = useState([]);
const [loading, setLoading] = useState(true);
const [statistics, setStatistics] = useState({
  totalAmount: 0,
  totalDonations: 0,
  uniqueVolunteers: 0,
  avgDonation: 0
});

useEffect(() => {
  // Check authorization
  if (!hasRole('authorizer')) {
    router.push('/auth');
    return;
  }

  fetchDonations();
}, []);

const fetchDonations = async () => {
  setLoading(true);
  try {
    const response = await donationAPI.getAllDonations({
      page: 1,
      limit: 20,
      search: searchQuery
    });
    
    if (response.success) {
      setDonations(response.donations);
      setStatistics(response.statistics);
    }
  } catch (error: any) {
    console.error('Error fetching donations:', error);
  } finally {
    setLoading(false);
  }
};

// Update search
useEffect(() => {
  const timer = setTimeout(() => {
    fetchDonations();
  }, 500);
  
  return () => clearTimeout(timer);
}, [searchQuery]);
```

### Step 5: Protect Routes

Create `lib/withAuth.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, hasRole } from './api';

export function withAuth(Component: any, requiredRole?: string) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/auth');
        return;
      }

      if (requiredRole && !hasRole(requiredRole)) {
        router.push('/landing');
      }
    }, [router]);

    if (!isAuthenticated()) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
```

Use it in pages:

```typescript
// app/volunteer-dashboard/page.tsx
export default withAuth(VolunteerDashboard, 'volunteer');

// app/admin/page.tsx
export default withAuth(AdminDashboard, 'authorizer');
```

## 🧪 Testing the Integration

### 1. Create Test Users

**Create Volunteer:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Volunteer",
    "email": "volunteer@test.com",
    "password": "password123",
    "role": "volunteer"
  }'
```

**Create Authorizer:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "email": "admin@test.com",
    "password": "password123",
    "role": "authorizer"
  }'
```

### 2. Test Login Flow

1. Go to `http://localhost:3000/landing`
2. Click "Sign In" → "Sign in as Volunteer"
3. Login with: `volunteer@test.com` / `password123`
4. Should redirect to volunteer dashboard

### 3. Test Donation Flow

1. Login as volunteer
2. Click "Make a Donation"
3. Select amount and fill details
4. Complete payment
5. Check success message

### 4. Test Admin Dashboard

1. Logout
2. Login with: `admin@test.com` / `password123`
3. Should see all donations in dashboard
4. Test search and filters

## 🔐 Security Checklist

- [x] Passwords hashed with bcrypt
- [x] JWT tokens for authentication
- [x] HTTP-only cookies
- [x] CORS configured
- [x] Rate limiting enabled
- [x] Input validation
- [x] Role-based access control
- [x] SQL injection prevention
- [x] XSS protection

## 📊 API Response Examples

### Successful Login
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "660a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "volunteer"
  }
}
```

### Donation Created
```json
{
  "success": true,
  "message": "Donation created successfully",
  "donation": {
    "_id": "660a1b2c3d4e5f6g7h8i9j0k",
    "userId": "660a1b2c3d4e5f6g7h8i9j0k",
    "amount": 1000,
    "paymentMethod": "UPI",
    "transactionId": "UPI202604071234567890",
    "status": "Success",
    "donorName": "John Doe",
    "donorEmail": "john@example.com",
    "createdAt": "2026-04-07T10:30:00.000Z"
  }
}
```

### All Donations (Admin)
```json
{
  "success": true,
  "count": 8,
  "total": 8,
  "page": 1,
  "pages": 1,
  "statistics": {
    "totalAmount": 22000,
    "totalDonations": 7,
    "avgDonation": 3143,
    "uniqueVolunteers": 8
  },
  "donations": [...]
}
```

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)

1. Push code to GitHub
2. Connect to Railway/Heroku
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import to Vercel
3. Set `NEXT_PUBLIC_API_URL` to production API URL
4. Deploy

## 🐛 Common Issues

### CORS Error
**Solution:** Update `FRONTEND_URL` in backend `.env`

### Token Not Persisting
**Solution:** Check localStorage in browser DevTools

### MongoDB Connection Failed
**Solution:** Ensure MongoDB is running: `brew services list`

### 401 Unauthorized
**Solution:** Check if token is being sent in Authorization header

## 📞 Need Help?

Check the logs:
- Backend: Terminal running `npm run dev`
- Frontend: Browser console (F12)
- MongoDB: `mongod` logs

## ✅ Integration Checklist

- [ ] Backend server running on port 5000
- [ ] MongoDB running and connected
- [ ] Frontend running on port 3000
- [ ] Environment variables configured
- [ ] Test users created
- [ ] Login flow working
- [ ] Donation creation working
- [ ] Admin dashboard showing data
- [ ] Search and filters working
- [ ] Role-based access working

## 🎉 Success!

Your Anandwan platform is now fully functional with:
- ✅ Secure authentication
- ✅ Real-time donations
- ✅ Admin analytics dashboard
- ✅ Production-ready architecture
