# Complete Tech Stack - Anandwan Platform

## 🎨 Frontend

### Core Framework
- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5.3** - Type-safe JavaScript

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS 8.4** - CSS processing
- **Autoprefixer 10.4** - CSS vendor prefixing
- **Custom Vintage Theme** - Unique color palette and typography

### Animations & UI
- **Framer Motion 11.0** - Advanced animations
- **Lucide React 0.344** - Modern icon library

### Typography
- **Playfair Display** - Serif headings
- **Lora** - Body text
- **Courier Prime** - Typewriter effect

## 🔧 Backend

### Server
- **Node.js 20+** - JavaScript runtime
- **Express.js 4.18** - Web framework
- **TypeScript** - Type safety (optional)

### Database
- **MongoDB** - NoSQL database
- **Mongoose 8.0** - ODM (Object Data Modeling)

### Authentication & Security
- **JWT (jsonwebtoken 9.0)** - Token-based auth
- **bcryptjs 2.4** - Password hashing
- **helmet 7.1** - Security headers
- **cors 2.8** - Cross-origin resource sharing
- **express-rate-limit 7.1** - API rate limiting
- **cookie-parser 1.4** - Cookie handling

### Validation
- **express-validator 7.0** - Input validation

### Development
- **nodemon 3.0** - Auto-reload server
- **dotenv 16.3** - Environment variables

## 📁 Project Structure

```
anandwan-platform/
├── app/                          # Next.js App Router
│   ├── landing/                  # Landing page
│   ├── auth/                     # Login/Register
│   ├── volunteer-dashboard/      # Volunteer dashboard
│   ├── payment/                  # Donation flow
│   ├── admin/                    # Admin dashboard
│   ├── gallery/                  # Media gallery
│   ├── marketplace/              # Handcrafted items
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   └── landing/                  # Landing page components
├── lib/                          # Utilities
│   └── api.ts                    # API integration
├── public/                       # Static assets
│   ├── images/                   # Images
│   └── videos/                   # Videos
├── server/                       # Backend API
│   ├── controllers/              # Request handlers
│   ├── models/                   # Database schemas
│   ├── routes/                   # API routes
│   ├── middleware/               # Custom middleware
│   └── server.js                 # Entry point
├── .env.local                    # Frontend env vars
├── server/.env                   # Backend env vars
├── package.json                  # Frontend dependencies
└── server/package.json           # Backend dependencies
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (volunteer/authorizer),
  createdAt: Date,
  updatedAt: Date
}
```

### Donations Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, indexed),
  amount: Number,
  paymentMethod: String (UPI/Card/Net Banking),
  transactionId: String (unique, indexed),
  status: String (Success/Failed/Pending, indexed),
  donorName: String,
  donorEmail: String,
  createdAt: Date (indexed),
  updatedAt: Date
}
```

## 🔐 Security Features

### Authentication
- JWT-based stateless authentication
- HTTP-only cookies
- Token expiration (7 days default)
- Password hashing with bcrypt (10 rounds)

### Authorization
- Role-based access control (RBAC)
- Protected routes
- Middleware validation

### API Security
- CORS protection
- Rate limiting (100 requests/15 min)
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention (Mongoose)
- XSS protection

## 🌐 API Architecture

### RESTful Endpoints

**Authentication**
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout

**Donations**
- POST `/api/donations` - Create donation (Volunteer)
- GET `/api/donations/my` - Get user's donations (Volunteer)
- GET `/api/donations/all` - Get all donations (Authorizer)
- GET `/api/donations/:id` - Get single donation

**Users**
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile

### Response Format
```javascript
{
  success: Boolean,
  message: String,
  data: Object/Array,
  errors: Array (validation errors)
}
```

## 🚀 Deployment Stack

### Frontend (Vercel)
- Automatic deployments from Git
- Edge network (CDN)
- Serverless functions
- Environment variables

### Backend Options

**Option 1: Railway**
- Easy deployment
- Automatic HTTPS
- Built-in MongoDB
- Environment variables

**Option 2: Heroku**
- Git-based deployment
- Add-ons for MongoDB
- Dyno management

**Option 3: DigitalOcean**
- App Platform
- Managed databases
- Scalable infrastructure

**Option 4: AWS**
- Elastic Beanstalk
- EC2 instances
- RDS for databases
- S3 for static files

### Database Hosting

**Option 1: MongoDB Atlas** (Recommended)
- Managed cloud database
- Free tier available
- Automatic backups
- Global clusters

**Option 2: Self-hosted**
- DigitalOcean Droplet
- AWS EC2
- Full control

## 📊 Performance Optimizations

### Frontend
- Server-side rendering (SSR)
- Static generation where possible
- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Framer Motion GPU acceleration

### Backend
- Database indexing
- Query optimization
- Pagination
- Caching (Redis - optional)
- Connection pooling

### Database
- Indexed fields: email, userId, transactionId, status, createdAt
- Compound indexes for complex queries
- Aggregation pipelines for statistics

## 🧪 Testing Stack (Future)

### Frontend Testing
- Jest - Unit testing
- React Testing Library - Component testing
- Cypress - E2E testing

### Backend Testing
- Jest - Unit testing
- Supertest - API testing
- MongoDB Memory Server - Test database

## 📦 Package Managers

- **npm** - Default package manager
- **pnpm** - Alternative (faster)
- **yarn** - Alternative

## 🔄 Development Workflow

1. **Local Development**
   - Frontend: `npm run dev` (port 3000)
   - Backend: `npm run dev` (port 5000)
   - MongoDB: Local or Atlas

2. **Version Control**
   - Git for source control
   - GitHub for repository
   - Feature branches

3. **CI/CD** (Future)
   - GitHub Actions
   - Automated testing
   - Automated deployment

## 🌍 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/anandwan
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 📈 Scalability Considerations

### Current Architecture
- Monolithic backend
- Single database
- Suitable for: 1,000-10,000 users

### Future Scaling Options
- Microservices architecture
- Database sharding
- Redis caching
- Load balancing
- CDN for static assets
- Message queues (RabbitMQ/Kafka)

## 🎯 Production Readiness

✅ **Implemented**
- Authentication & authorization
- Input validation
- Error handling
- Security headers
- Rate limiting
- Database indexing
- CORS configuration
- Environment variables

⏳ **Future Enhancements**
- Payment gateway integration (Razorpay/Stripe)
- Email notifications
- File uploads (AWS S3)
- Real-time updates (WebSockets)
- Analytics dashboard
- Automated backups
- Monitoring (Sentry)
- Logging (Winston)

## 💰 Cost Estimate (Monthly)

### Free Tier
- Frontend: Vercel (Free)
- Backend: Railway (Free tier)
- Database: MongoDB Atlas (Free 512MB)
- **Total: $0/month**

### Production Tier
- Frontend: Vercel Pro ($20)
- Backend: Railway Pro ($5-20)
- Database: MongoDB Atlas M10 ($57)
- **Total: ~$82-97/month**

## 📚 Documentation

- API Documentation: Swagger/OpenAPI (future)
- Code Comments: JSDoc
- README files in each directory
- Integration guides
- Deployment guides

## 🎓 Learning Resources

- Next.js: https://nextjs.org/docs
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- JWT: https://jwt.io/
- Tailwind CSS: https://tailwindcss.com/docs

---

**Last Updated:** April 7, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
