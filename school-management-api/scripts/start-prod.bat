@echo off
echo Starting School Management API in Production Mode...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo Building and starting production environment...
docker-compose up --build -d

echo.
echo Waiting for services to be ready...
timeout /t 30 /nobreak >nul

echo.
echo Services Status:
docker-compose ps

echo.
echo Production environment is ready!
echo.
echo Available services:
echo - School Management API: http://localhost:3000
echo - API Documentation: http://localhost:3000/api/docs
echo - PostgreSQL Database: localhost:5432
echo - Redis Cache: localhost:6379
echo.
echo To view logs:
echo docker-compose logs -f api
echo.
echo To stop services:
echo docker-compose down
echo.
echo Press any key to continue...
pause >nul

