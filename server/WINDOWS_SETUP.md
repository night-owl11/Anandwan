# MongoDB Setup for Windows

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

### Steps:
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a free M0 cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anandwan?retryWrites=true&w=majority
   ```
7. Replace `username` and `password` with your credentials
8. Start server: `npm run dev`

## Option 2: Install MongoDB Locally

### Download and Install:
1. Download MongoDB Community Server from:
   https://www.mongodb.com/try/download/community
   
2. Choose:
   - Version: Latest (7.0+)
   - Platform: Windows
   - Package: MSI

3. Run the installer:
   - Choose "Complete" installation
   - Install MongoDB as a Service (check this option)
   - Install MongoDB Compass (optional GUI tool)

### Start MongoDB Service:

**Method 1: Using Services**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB Server"
4. Right-click → Start

**Method 2: Using Command Prompt (as Administrator)**
```cmd
net start MongoDB
```

**Method 3: Using PowerShell (as Administrator)**
```powershell
Start-Service MongoDB
```

### Verify MongoDB is Running:

Open PowerShell and run:
```powershell
mongosh
```

If it connects, MongoDB is running! Type `exit` to quit.

### Update .env:
```env
MONGODB_URI=mongodb://localhost:27017/anandwan
```

## Option 3: Use Docker (If you have Docker Desktop)

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Update `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/anandwan
```

## Start Your Backend Server

Once MongoDB is set up (any option above):

```powershell
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

## Troubleshooting

### MongoDB Service Not Starting
1. Check if port 27017 is available:
   ```powershell
   netstat -ano | findstr :27017
   ```

2. Check MongoDB logs:
   ```
   C:\Program Files\MongoDB\Server\7.0\log\mongod.log
   ```

### Connection Error
- Ensure MongoDB service is running
- Check firewall settings
- Verify connection string in `.env`

### "mongosh" not recognized
- Add MongoDB to PATH:
  1. Search "Environment Variables" in Windows
  2. Edit System PATH
  3. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
  4. Restart PowerShell

## Quick Test

After starting the server, test the API:

```powershell
# Health check
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Anandwan API is running"
}
```

## Next Steps

1. ✅ MongoDB running
2. ✅ Backend server running
3. Start frontend: `npm run dev` (in project root)
4. Create test users (see INTEGRATION_GUIDE.md)
5. Test the application!
