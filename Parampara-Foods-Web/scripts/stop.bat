@echo off
echo ========================================
echo    Stopping Parampara Foods Services
echo ========================================
echo.

echo Stopping Frontend (Node.js)...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✓ Frontend stopped successfully.
) else (
    echo - No frontend processes found.
)

echo.
echo Stopping Backend (.NET)...
taskkill /f /im dotnet.exe 2>nul
if %errorlevel% equ 0 (
    echo ✓ Backend stopped successfully.
) else (
    echo - No backend processes found.
)

echo.
echo ========================================
echo         All services stopped!
echo ========================================
echo.
pause
