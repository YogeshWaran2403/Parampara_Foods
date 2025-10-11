@echo off
echo ========================================
echo    Reset Database (Drop + Recreate + Seed)
echo ========================================
echo.

echo WARNING: This will delete ALL data in the database!
echo.
set /p confirm="Are you sure? (y/N): "
if /i not "%confirm%"=="y" (
    echo Operation cancelled.
    pause
    exit /b
)

echo.
echo [1/3] Stopping all services...
taskkill /f /im node.exe 2>nul
taskkill /f /im dotnet.exe 2>nul
echo Done.

echo.
echo [2/3] Dropping and recreating database...
cd /d "D:\Parampara_MI\Parampara-Foods-API"
dotnet ef database drop --force
dotnet ef database update
echo Database recreated.

echo.
echo [3/3] Starting backend to seed fresh data...
start /B "Backend Server" dotnet run --urls=http://0.0.0.0:8080
ping 127.0.0.1 -n 5 >nul

echo.
echo ========================================
echo       Database Reset Complete!
echo ========================================
echo.
echo ✓ Database dropped and recreated
echo ✓ Fresh data seeded
echo ✓ Backend running on port 8080
echo.
echo Next steps:
echo 1. Run 'start.bat' to start frontend
echo 2. Or use the backend for API testing
echo.
pause
