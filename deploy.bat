@echo off
echo ===================================
echo Dental Website Deployment
echo ===================================
echo.
echo 1. Deploy Backend to Railway
echo 2. Deploy Frontend to Vercel
echo 3. Exit
echo.
set /p choice="Select option (1-3): "

if "%choice%"=="1" (
    cd backend
    railway login
    railway init
    railway up
    echo.
    echo Backend deployed! Copy the URL for frontend setup.
    pause
)

if "%choice%"=="2" (
    cd backend/admin-dashboard
    vercel login
    vercel
    echo.
    echo Frontend deployed! Don't forget to set VITE_API_URL in Vercel.
    pause
)

if "%choice%"=="3" exit
