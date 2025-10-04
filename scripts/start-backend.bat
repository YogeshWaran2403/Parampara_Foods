@echo off
echo Starting Backend on port 5000...

REM Change to backend directory
cd /d "D:\Prampura"

REM Kill any existing processes on port 5000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    taskkill /f /pid %%a >nul 2>&1
)

REM Start backend
echo Starting .NET API server...
dotnet run --urls "http://localhost:5000"

pause
