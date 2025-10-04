@echo off
echo ========================================
echo   Starting Backend on Standard Port 5123
echo ========================================

REM Change to backend directory
cd /d "D:\Prampura"

REM Kill any existing processes on port 5123
echo [1/2] Cleaning up existing backend processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5123') do (
    if not "%%a"=="0" (
        echo   Killing process %%a on port 5123
        taskkill /f /pid %%a >nul 2>&1
    )
)

REM Start backend on standard port 5123 with mobile access
echo [2/2] Starting Backend on http://0.0.0.0:5123...
echo ✓ Backend will be accessible from:
echo   - Laptop: http://localhost:5123
echo   - Mobile: http://192.168.1.10:5123
echo.
dotnet run --urls http://0.0.0.0:5123

pause