@echo off
REM Anandwan Platform Setup Script for Windows

echo ========================================
echo Anandwan Platform Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
    echo [OK] Backend .env created. Please update with your configuration.
) else (
    echo [OK] Backend .env already exists
)
echo.

REM Go back to root
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo Creating frontend .env.local file...
    echo NEXT_PUBLIC_API_URL=http://localhost:5000/api > .env.local
    echo [OK] Frontend .env.local created
) else (
    echo [OK] Frontend .env.local already exists
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Start MongoDB:
echo    net start MongoDB
echo.
echo 2. Start the backend server:
echo    cd server
echo    npm run dev
echo.
echo 3. In a new terminal, start the frontend:
echo    npm run dev
echo.
echo 4. Create test users using the commands in QUICK_START.md
echo.
echo 5. Open http://localhost:3000 in your browser
echo.
echo Documentation:
echo    - QUICK_START.md - Quick setup guide
echo    - INTEGRATION_GUIDE.md - Integration details
echo    - server/README.md - Backend API docs
echo.
echo Happy coding!
echo.
pause
