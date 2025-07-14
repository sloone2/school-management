@echo off
echo Starting School Management API in Development Mode...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo Starting development environment...
docker-compose -f docker-compose.dev.yml up -d

echo.
echo Waiting for services to be ready...
timeout /t 10 /nobreak >nul

echo.
echo Services Status:
docker-compose -f docker-compose.dev.yml ps

echo.
echo Development environment is ready!
echo.
echo Available services:
echo - PostgreSQL Database: localhost:5433
echo - Redis Cache: localhost:6380
echo - pgAdmin: http://localhost:5051 (admin@school.com / admin123)
echo.
echo To run the API locally:
echo 1. Copy .env.example to .env
echo 2. Update DB_HOST=localhost and DB_PORT=5433 in .env
echo 3. Run: npm run start:dev
echo.
echo Press any key to continue...
pause >nul

