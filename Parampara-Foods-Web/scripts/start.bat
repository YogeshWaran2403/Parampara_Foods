@echo off
echo ========================================
echo    Parampara Foods - Starting Services
echo ========================================
echo.

echo [1/4] Stopping any existing processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im dotnet.exe 2>nul
echo Done.

echo.
echo [1.5/4] Detecting network IP address...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    for /f "tokens=1" %%j in ("%%i") do (
        set LOCAL_IP=%%j
        goto :ip_found
    )
)
:ip_found
echo Detected IP: %LOCAL_IP%

echo.
echo [2/4] Starting Backend (Port 8080)...
cd /d "D:\Parampara_MI\Parampara-Foods-API"
start /B "Backend Server" dotnet run --urls=http://0.0.0.0:8080
ping 127.0.0.1 -n 4 >nul

echo.
echo [3/4] Starting Frontend (Port 3000)...
cd /d "D:\Parampara_MI\Parampara-Foods-Web"
start /B "Frontend Server" npm run dev
ping 127.0.0.1 -n 6 >nul

echo.
echo [4/4] Services Started Successfully!
echo.
echo ========================================
echo           ACCESS URLS
echo ========================================
echo.
echo Frontend (Local):    http://localhost:3000
echo Frontend (Mobile):   http://%LOCAL_IP%:3000
echo.
echo Backend (Local):     http://localhost:8080
echo Backend (Mobile):    http://%LOCAL_IP%:8080
echo Swagger UI:          http://localhost:8080/swagger
echo.
echo ========================================
echo        TEST CREDENTIALS
echo ========================================
echo Admin: admin@parampara.com / Admin123!
echo User:  user@parampara.com / User123!
echo.
echo ========================================
echo        MOBILE ACCESS QR CODES
echo ========================================
echo.
echo Frontend QR: https://api.qrserver.com/v1/create-qr-code/?size=200x200^&data=http://%LOCAL_IP%:3000
echo Backend QR:  https://api.qrserver.com/v1/create-qr-code/?size=200x200^&data=http://%LOCAL_IP%:8080/swagger
echo.
echo ========================================
echo.
echo Both services are now running!
echo.
echo Opening frontend QR code in browser...
start "" "https://api.qrserver.com/v1/create-qr-code/?size=200x200^&data=http://%LOCAL_IP%:3000"
echo.
echo Frontend QR code opened in browser!
echo Close this window when done.
pause
