@echo off
echo Stopping School Management API Services...
echo.

REM Stop production services
echo Stopping production services...
docker-compose down

REM Stop development services
echo Stopping development services...
docker-compose -f docker-compose.dev.yml down

echo.
echo All services stopped successfully!
echo.
echo To remove all data (WARNING: This will delete all database data):
echo docker-compose down -v
echo.
echo Press any key to continue...
pause >nul

