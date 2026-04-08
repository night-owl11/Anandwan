@echo off
echo Checking Anandwan Setup...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js installed
    node --version
) else (
    echo [ERROR] Node.js not found
)

REM Check if backend .env exists
if exist "server\.env" (
    echo [OK] Backend .env exists
) else (
    echo [ERROR] Backend .env missing - run: cd server ^&^& copy .env.example .env
)

REM Check if frontend .env.local exists
if exist ".env.local" (
    echo [OK] Frontend .env.local exists
) else (
    echo [ERROR] Frontend .env.local missing
)

REM Check if backend is running
curl -s http://localhost:5000/api/health >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend server is running
) else (
    echo [ERROR] Backend server not running - run: cd server ^&^& npm run dev
)

REM Check if frontend is running
curl -s http://localhost:3000 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend server is running
) else (
    echo [ERROR] Frontend server not running - run: npm run dev
)

echo.
echo Summary:
echo If you see any [ERROR], fix those issues first.
echo.
pause
