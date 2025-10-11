@echo off
echo Resetting Database and Seeding Data...

REM Change to backend directory
cd /d "D:\Prampura"

echo Dropping existing database...
dotnet ef database drop --force

echo Creating new database...
dotnet ef database update

echo Database reset completed!
echo The application will automatically seed data on next startup.

pause

