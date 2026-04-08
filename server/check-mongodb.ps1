# MongoDB Status Checker for Windows
Write-Host "Checking MongoDB Status..." -ForegroundColor Cyan

# Check if MongoDB service exists
$service = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($service) {
    Write-Host "`n✅ MongoDB Service Found" -ForegroundColor Green
    Write-Host "Status: $($service.Status)" -ForegroundColor Yellow
    
    if ($service.Status -eq "Running") {
        Write-Host "`n✅ MongoDB is running!" -ForegroundColor Green
        Write-Host "`nYou can now start the backend server:" -ForegroundColor Cyan
        Write-Host "  npm run dev" -ForegroundColor White
    } else {
        Write-Host "`n⚠️  MongoDB service exists but is not running" -ForegroundColor Yellow
        Write-Host "`nTo start MongoDB, run (as Administrator):" -ForegroundColor Cyan
        Write-Host "  Start-Service MongoDB" -ForegroundColor White
        Write-Host "  OR" -ForegroundColor Gray
        Write-Host "  net start MongoDB" -ForegroundColor White
    }
} else {
    Write-Host "`n❌ MongoDB service not found" -ForegroundColor Red
    Write-Host "`nOptions:" -ForegroundColor Yellow
    Write-Host "1. Install MongoDB locally:" -ForegroundColor Cyan
    Write-Host "   https://www.mongodb.com/try/download/community" -ForegroundColor White
    Write-Host "`n2. Use MongoDB Atlas (Cloud - Recommended):" -ForegroundColor Cyan
    Write-Host "   https://www.mongodb.com/cloud/atlas" -ForegroundColor White
    Write-Host "`n3. Use Docker:" -ForegroundColor Cyan
    Write-Host "   docker run -d -p 27017:27017 --name mongodb mongo:latest" -ForegroundColor White
    Write-Host "`nSee WINDOWS_SETUP.md for detailed instructions" -ForegroundColor Gray
}

# Check if port 27017 is in use
Write-Host "`n---" -ForegroundColor Gray
Write-Host "Checking port 27017..." -ForegroundColor Cyan
$port = netstat -ano | Select-String ":27017"
if ($port) {
    Write-Host "✅ Port 27017 is in use (MongoDB might be running)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Port 27017 is not in use" -ForegroundColor Yellow
}

Write-Host "`n---" -ForegroundColor Gray
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
