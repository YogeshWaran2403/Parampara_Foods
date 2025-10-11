@echo off
echo Seeding Database with Fresh Data...

REM Change to backend directory
cd /d "D:\Prampura"

echo Dropping existing database...
dotnet ef database drop --force

echo Creating new database...
dotnet ef database update

echo Starting application to trigger seeding...
echo (This will automatically seed the database with fresh data)
dotnet run --urls "http://localhost:5000"

pause

