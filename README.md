# 🌟 Anandwan Storytelling Platform

A full-stack web application for preserving and sharing the stories of Anandwan with a vintage "old letters/archival" aesthetic.

## 📖 About

"We are building a system that ensures no story of Anandwan ever goes unseen again."

This platform enables volunteers to make donations and administrators to manage donation records, all while celebrating the heritage and stories of Anandwan.

## ✨ Features

### 🎨 Frontend
- **Landing Page** - Beautiful vintage-themed homepage with hero section, stories, journey timeline, and contact
- **Gallery** - Curated video gallery showcasing moments from Anandwan
- **Authentication** - Secure login/registration for volunteers and authorizers
- **Volunteer Dashboard** - Make donations or shop handcrafted items
- **Payment Flow** - Seamless donation process with multiple payment methods
- **Admin Dashboard** - View, search, filter, and analyze all donations
- **Marketplace** - Browse handcrafted items made by the Anandwan community

### 🔧 Backend
- **RESTful API** - Built with Node.js + Express.js
- **MongoDB Database** - Secure data storage with Mongoose ODM
- **JWT Authentication** - Token-based secure authentication
- **Role-Based Access** - Volunteer and Authorizer roles
- **Password Security** - bcrypt hashing
- **Input Validation** - express-validator
- **Security** - Helmet, CORS, rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd anandwan
```

2. **Run setup script**
```bash
# Windows
setup.bat

# Mac/Linux
chmod +x setup.sh
./setup.sh
```

3. **Start MongoDB**
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongodb
```

4. **Start backend server**
```bash
cd server
npm run dev
```

5. **Start frontend** (in new terminal)
```bash
npm run dev
```

6. **Create test users**
```bash
# See QUICK_START.md for commands
```

7. **Open browser**
```
http://localhost:3000
```

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Fast setup guide with troubleshooting
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Detailed integration steps
- **[INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md)** - What's implemented
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture diagrams
- **[TECH_STACK.md](TECH_STACK.md)** - Complete technology overview
- **[server/README.md](server/README.md)** - Backend API documentation

## 🏗️ Project Structure

```
anandwan/
├── app/                      # Next.js pages
│   ├── landing/             # Landing page
│   ├── auth/                # Login page
│   ├── register/            # Registration page
│   ├── volunteer-dashboard/ # Volunteer dashboard
│   ├── payment/             # Donation flow
│   ├── admin/               # Admin dashboard
│   ├── gallery/             # Video gallery
│   └── marketplace/         # Handcrafted items
├── components/              # React components
│   └── landing/            # Landing page components
├── lib/                     # Utilities
│   └── api.ts              # API client
├── server/                  # Backend
│   ├── models/             # Database schemas
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   └── middleware/         # Auth middleware
├── public/                  # Static assets
│   ├── images/             # Images
│   └── videos/             # Videos
└── Documentation files
```

## 🎨 Design System

### Colors
- **Vintage Paper** (#F4ECD8) - Background
- **Vintage Ink** (#2C1810) - Primary text
- **Vintage Sepia** (#704214) - Secondary
- **Vintage Stamp** (#8B4513) - Accents

### Typography
- **Playfair Display** - Serif headings
- **Lora** - Body text
- **Courier Prime** - Typewriter effect

## 🔐 User Roles

### Volunteer
- Register and login
- Make donations
- View donation history
- Shop handcrafted items

### Authorizer (Admin)
- Login to admin dashboard
- View all donations
- Search and filter donations
- Analyze donation statistics

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Donations
- `POST /api/donations` - Create donation (Volunteer)
- `GET /api/donations/my` - Get my donations (Volunteer)
- `GET /api/donations/all` - Get all donations (Authorizer)
- `GET /api/donations/:id` - Get single donation

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 🧪 Testing

### Test Credentials

**Volunteer:**
- Email: `volunteer@test.com`
- Password: `password123`

**Admin:**
- Email: `admin@test.com`
- Password: `password123`

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Backend (Railway/Heroku)
1. Push to GitHub
2. Connect to Railway/Heroku
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Get connection string
3. Update `MONGODB_URI` in production

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14.2
- React 18.3
- TypeScript 5.3
- Tailwind CSS 3.4
- Framer Motion 11.0

**Backend:**
- Node.js
- Express.js 4.18
- MongoDB
- Mongoose 8.0
- JWT
- bcryptjs

**Security:**
- Helmet
- CORS
- Rate Limiting
- Input Validation

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review `QUICK_START.md` for setup issues
3. Check browser console for frontend errors
4. Check server terminal for backend errors

## 🎯 Mission

This platform preserves the dignity and stories of Anandwan, ensuring that every contribution—whether through donations or purchases—supports real people and real transformations.

---

**"Every contribution helps preserve the stories of Anandwan"**

Last Updated: April 2026
Version: 1.0.0
Status: Production Ready ✅
