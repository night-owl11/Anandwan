#!/bin/bash

# Anandwan Platform Setup Script
# This script automates the setup process

echo "🚀 Anandwan Platform Setup"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if MongoDB is running
if ! command -v mongosh &> /dev/null && ! command -v mongo &> /dev/null; then
    echo "⚠️  MongoDB CLI not found. Make sure MongoDB is installed and running."
    echo "   Visit: https://www.mongodb.com/try/download/community"
    echo ""
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "✅ Backend .env created. Please update with your configuration."
else
    echo "✅ Backend .env already exists"
fi
echo ""

# Go back to root
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating frontend .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
    echo "✅ Frontend .env.local created"
else
    echo "✅ Frontend .env.local already exists"
fi
echo ""

echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start MongoDB (if not already running):"
echo "   macOS: brew services start mongodb-community"
echo "   Windows: net start MongoDB"
echo "   Linux: sudo systemctl start mongodb"
echo ""
echo "2. Start the backend server:"
echo "   cd server && npm run dev"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   npm run dev"
echo ""
echo "4. Create test users using the commands in QUICK_START.md"
echo ""
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation:"
echo "   - QUICK_START.md - Quick setup guide"
echo "   - INTEGRATION_GUIDE.md - Integration details"
echo "   - server/README.md - Backend API docs"
echo ""
echo "Happy coding! 🎉"
