# 🪟 School Management API - Windows Setup Guide with Docker

## 🚀 Quick Start for Windows Users

This guide will help you set up the School Management API on Windows using Docker - the easiest and most reliable way!

---

## 📋 Prerequisites

### 1. Install Docker Desktop for Windows
```powershell
# Download from: https://www.docker.com/products/docker-desktop/
# Or use winget (Windows Package Manager)
winget install Docker.DockerDesktop
```

**After installation:**
1. Restart your computer
2. Start Docker Desktop
3. Enable WSL 2 integration if prompted
4. Verify installation:
```cmd
docker --version
docker-compose --version
```

### 2. Install Git (if not already installed)
```powershell
# Download from: https://git-scm.com/download/win
# Or use winget
winget install Git.Git
```

### 3. Install Node.js (for local development)
```powershell
# Download from: https://nodejs.org/
# Or use winget
winget install OpenJS.NodeJS
```

---

## 🎯 Setup Options

### Option 1: Full Docker Setup (Recommended)
Everything runs in Docker containers - no local setup needed!

### Option 2: Hybrid Setup
Database in Docker, API runs locally for development

---

## 🐳 Option 1: Full Docker Setup (Recommended)

### Step 1: Extract and Prepare Project
```cmd
# Extract the zip file to your desired location
# For example: C:\Projects\school-management-api

cd C:\Projects\school-management-api
```

### Step 2: Quick Start with Scripts
```cmd
# Start production environment (recommended for testing)
scripts\start-prod.bat

# OR start development environment (for development)
scripts\start-dev.bat

# To stop all services
scripts\stop.bat
```

### Step 3: Access Your Application
- **API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **Database**: localhost:5432 (production) or localhost:5433 (development)

---

## 🔧 Option 2: Hybrid Setup (Development)

### Step 1: Start Database Only
```cmd
# Start development database and tools
docker-compose -f docker-compose.dev.yml up -d postgres redis pgadmin
```

### Step 2: Setup Local Environment
```cmd
# Copy environment file
copy .env.example .env

# Edit .env file with these settings:
# DB_HOST=localhost
# DB_PORT=5433
# DB_USERNAME=school_admin
# DB_PASSWORD=school_password_dev
# DB_NAME=school_management_dev
```

### Step 3: Install Dependencies and Run
```cmd
npm install
npm run start:dev
```

### Step 4: Access Services
- **API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **pgAdmin**: http://localhost:5051 (admin@school.com / admin123)
- **Database**: localhost:5433

---

## 📊 Database Management

### Using pgAdmin (Web Interface)
1. Open http://localhost:5051
2. Login: admin@school.com / admin123
3. Add server:
   - **Name**: School Management DB
   - **Host**: postgres (for Docker) or localhost (for hybrid)
   - **Port**: 5432 (production) or 5433 (development)
   - **Username**: school_admin
   - **Password**: school_password_2024 (prod) or school_password_dev (dev)

### Using Command Line
```cmd
# Connect to production database
docker exec -it school-management-db-dev psql -U school_admin -d school_management_dev

# Connect to development database
docker exec -it school-management-db psql -U school_admin -d school_management
```

---

## 🔐 Initialize the System

### Step 1: Create Admin User
```powershell
# Using PowerShell (recommended)
$headers = @{ "Content-Type" = "application/json" }
$body = @{
    email = "admin@school.com"
    password = "admin123"
    firstName = "System"
    lastName = "Administrator"
    userType = "staff"
    employeeId = "ADM001"
    staffType = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Headers $headers -Body $body
```

### Step 2: Initialize Default Claims
```powershell
# Get admin token from previous response and use it here
$token = "YOUR_ADMIN_TOKEN_HERE"
$headers = @{ 
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json" 
}

Invoke-RestMethod -Uri "http://localhost:3000/api/claims/initialize" -Method Post -Headers $headers
```

### Step 3: Test the System
```powershell
# Login as admin
$loginBody = @{
    email = "admin@school.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $loginBody

# Get navigation menu
$token = $response.access_token
$navHeaders = @{ "Authorization" = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/navigation" -Method Get -Headers $navHeaders
```

---

## 🛠️ Development Workflow

### Starting Development
```cmd
# Start development environment
scripts\start-dev.bat

# In another terminal, run the API locally
npm run start:dev
```

### Making Changes
1. Edit code in your favorite editor (VS Code recommended)
2. API will auto-reload with changes
3. Database persists between restarts

### Viewing Logs
```cmd
# View API logs (if running in Docker)
docker-compose logs -f api

# View database logs
docker-compose logs -f postgres

# View all logs
docker-compose logs -f
```

### Rebuilding After Changes
```cmd
# Rebuild and restart API container
docker-compose up --build -d api

# Or restart everything
docker-compose down
docker-compose up --build -d
```

---

## 🚀 Production Deployment

### Environment Configuration
Create a `.env.production` file:
```env
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=school_admin
DB_PASSWORD=your-super-secure-password-here
DB_NAME=school_management
JWT_SECRET=your-super-secure-jwt-secret-here
JWT_EXPIRES_IN=24h
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com
```

### Deploy with Docker
```cmd
# Build and start production environment
docker-compose --env-file .env.production up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🔍 Troubleshooting

### Common Windows Issues

#### 1. Docker Desktop Not Starting
```cmd
# Check Windows features
# Enable: Hyper-V, Windows Subsystem for Linux, Virtual Machine Platform

# Restart Docker Desktop
# Check Docker settings > Resources > WSL Integration
```

#### 2. Port Already in Use
```cmd
# Check what's using the port
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different ports in docker-compose.yml
```

#### 3. Database Connection Issues
```cmd
# Check if PostgreSQL container is running
docker ps

# Check container logs
docker logs school-management-db

# Restart database container
docker-compose restart postgres
```

#### 4. Permission Issues
```cmd
# Run Command Prompt as Administrator
# Or use PowerShell as Administrator

# Check Docker permissions
docker run hello-world
```

### Useful Commands

#### Docker Management
```cmd
# View running containers
docker ps

# View all containers
docker ps -a

# View images
docker images

# Clean up unused containers and images
docker system prune -a

# View container logs
docker logs <container-name>

# Execute commands in container
docker exec -it <container-name> /bin/sh
```

#### Database Operations
```cmd
# Backup database
docker exec school-management-db pg_dump -U school_admin school_management > backup.sql

# Restore database
docker exec -i school-management-db psql -U school_admin school_management < backup.sql

# Reset database (WARNING: Deletes all data)
docker-compose down -v
docker-compose up -d
```

---

## 📱 Testing with Frontend

### Angular Integration
```typescript
// In your Angular app, update environment files:

// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

// HTTP Interceptor for JWT
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}
```

### Testing API Endpoints
```powershell
# Test health endpoint
Invoke-RestMethod -Uri "http://localhost:3000/api/health"

# Test authentication
$loginData = @{
    email = "admin@school.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $loginData

# Use token for authenticated requests
$headers = @{ "Authorization" = "Bearer $($response.access_token)" }
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Headers $headers
```

---

## 🎉 You're All Set!

Your School Management API is now running on Windows with Docker! 

### What You Have:
✅ **Complete Backend API** with claims-based authorization
✅ **PostgreSQL Database** with persistent data
✅ **Redis Cache** for performance
✅ **pgAdmin** for database management
✅ **Health Monitoring** and logging
✅ **Development & Production** environments
✅ **Windows-optimized** scripts and workflows

### Next Steps:
1. **Explore the API** at http://localhost:3000/api/docs
2. **Create test users** (students, parents, instructors)
3. **Test the claims system** with different user types
4. **Integrate with your Angular frontend**
5. **Customize claims and permissions** for your school's needs

### Need Help?
- Check the logs: `docker-compose logs -f`
- Visit the API docs: http://localhost:3000/api/docs
- Use pgAdmin: http://localhost:5051
- Test endpoints with PowerShell scripts above

Happy coding! 🚀

