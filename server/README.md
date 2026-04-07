# Anandwan Backend API

Complete backend system for the Anandwan Storytelling Platform with authentication, donations, and admin dashboard.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **rate-limit** - API rate limiting

## 📁 Project Structure

```
server/
├── controllers/        # Request handlers
│   ├── authController.js
│   ├── donationController.js
│   └── userController.js
├── models/            # Database schemas
│   ├── User.js
│   └── Donation.js
├── routes/            # API routes
│   ├── auth.js
│   ├── donations.js
│   └── users.js
├── middleware/        # Custom middleware
│   └── auth.js
├── server.js          # Entry point
├── package.json
└── .env.example       # Environment variables template
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/anandwan
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### 3. Install and Start MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually
mongod --config /usr/local/etc/mongod.conf
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |

### Donations

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/donations` | Create donation | Volunteer |
| GET | `/api/donations/my` | Get my donations | Volunteer |
| GET | `/api/donations/all` | Get all donations | Authorizer |
| GET | `/api/donations/:id` | Get donation by ID | Private |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update profile | Private |

## 🔐 User Roles

- **volunteer**: Can make donations and view their own donation history
- **authorizer**: Admin role, can view all donations and analytics

## 📝 API Request Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "volunteer"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Donation (requires token)
```bash
curl -X POST http://localhost:5000/api/donations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 1000,
    "paymentMethod": "UPI",
    "donorName": "John Doe",
    "donorEmail": "john@example.com"
  }'
```

### Get All Donations (Authorizer only)
```bash
curl -X GET "http://localhost:5000/api/donations/all?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention (via Mongoose)
- XSS protection (via helmet)
- Role-based access control

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Anandwan API is running",
  "timestamp": "2026-04-07T..."
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_production_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **DigitalOcean**: Deploy via App Platform
- **AWS**: Use Elastic Beanstalk or EC2

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (volunteer/authorizer),
  createdAt: Date
}
```

### Donation Schema
```javascript
{
  userId: ObjectId (ref: User),
  amount: Number,
  paymentMethod: String,
  transactionId: String (unique),
  status: String (Success/Failed/Pending),
  donorName: String,
  donorEmail: String,
  createdAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### JWT Token Issues
- Ensure JWT_SECRET is set
- Check token expiration
- Verify Authorization header format

### CORS Errors
- Update FRONTEND_URL in `.env`
- Check CORS configuration in server.js

## 📞 Support

For issues or questions, please check the documentation or contact the development team.
