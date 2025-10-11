@echo off
echo ========================================
echo    Backend Development Mode
echo ========================================
echo.

echo [0.5/2] Detecting network IP address...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    for /f "tokens=1" %%j in ("%%i") do (
        set LOCAL_IP=%%j
        goto :ip_found
    )
)
:ip_found
echo Detected IP: %LOCAL_IP%

echo.
echo [1/2] Stopping Backend...
taskkill /f /im dotnet.exe 2>nul
if %errorlevel% equ 0 (
    echo ✓ Backend stopped successfully.
) else (
    echo - No backend processes found.
)

echo.
echo [2/2] Starting Backend (Port 8080)...
cd /d "D:\Parampara_MI\Parampara-Foods-API"
echo Starting backend with mobile access...
echo Note: Database seeding only runs if database is empty
start /B "Backend Dev Server" dotnet run --urls=http://0.0.0.0:8080

echo.
echo ========================================
echo       Backend Development Ready!
echo ========================================
echo.
echo Backend URLs:
echo - Local:  http://localhost:8080
echo - Mobile: http://%LOCAL_IP%:8080
echo - Swagger: http://localhost:8080/swagger
echo.
echo ✓ Make your changes and the server will auto-reload.
echo ✓ Frontend is still running on port 3000.
echo.
pause
