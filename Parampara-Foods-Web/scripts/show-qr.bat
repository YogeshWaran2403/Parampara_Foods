@echo off
echo ========================================
echo    Parampara Foods - QR Code Display
echo ========================================
echo.

echo Detecting network IP address...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    for /f "tokens=1" %%j in ("%%i") do (
        set LOCAL_IP=%%j
        goto :ip_found
    )
)
:ip_found
echo Detected IP: %LOCAL_IP%
echo.

echo ========================================
echo        MOBILE ACCESS QR CODES
echo ========================================
echo.

echo Frontend QR Code (for mobile browsers):
echo https://api.qrserver.com/v1/create-qr-code/?size=200x200^&data=http://%LOCAL_IP%:3000
echo.

echo Backend API QR Code (for API testing):
echo https://api.qrserver.com/v1/create-qr-code/?size=200x200^&data=http://%LOCAL_IP%:8080/swagger
echo.

echo ========================================
echo        MANUAL MOBILE ACCESS
echo ========================================
echo.
echo Frontend (Mobile): http://%LOCAL_IP%:3000
echo Backend API:       http://%LOCAL_IP%:8080
echo Swagger UI:        http://%LOCAL_IP%:8080/swagger
echo.
echo ========================================
echo           INSTRUCTIONS
echo ========================================
echo.
echo 1. Scan QR codes with your phone camera
echo 2. Or manually type the URLs above
echo 3. Make sure your phone is on the same WiFi network
echo.
pause
