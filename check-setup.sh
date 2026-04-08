#!/bin/bash

echo "🔍 Checking Anandwan Setup..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node --version)"
else
    echo "❌ Node.js not found"
fi

# Check MongoDB
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    echo "✅ MongoDB CLI found"
else
    echo "⚠️  MongoDB CLI not found"
fi

# Check if backend .env exists
if [ -f "server/.env" ]; then
    echo "✅ Backend .env exists"
else
    echo "❌ Backend .env missing - run: cd server && cp .env.example .env"
fi

# Check if frontend .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Frontend .env.local exists"
else
    echo "❌ Frontend .env.local missing"
fi

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend server is running"
else
    echo "❌ Backend server not running - run: cd server && npm run dev"
fi

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend server is running"
else
    echo "❌ Frontend server not running - run: npm run dev"
fi

echo ""
echo "📋 Summary:"
echo "If you see any ❌, fix those issues first."
