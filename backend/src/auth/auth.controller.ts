import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticate user and return JWT token. Supports parent login as student.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            userType: { type: 'string' },
            role: { type: 'string' },
            claims: { type: 'array', items: { type: 'string' } },
            frontendRoutes: { type: 'array', items: { type: 'string' } },
            canManageStudents: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ 
    summary: 'User registration',
    description: 'Register a new user (student, parent, or staff)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Registration successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            userType: { type: 'string' },
            role: { type: 'string' },
            claims: { type: 'array', items: { type: 'string' } },
            frontendRoutes: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Registration failed' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get user profile',
    description: 'Get current authenticated user profile with claims and routes'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        userType: { type: 'string' },
        role: { type: 'string' },
        claims: { type: 'array', items: { type: 'string' } },
        frontendRoutes: { type: 'array', items: { type: 'string' } },
        canManageStudents: { type: 'array', items: { type: 'string' } }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      userType: req.user.userType,
      role: req.user.role,
      claims: req.user.claims,
      frontendRoutes: req.user.frontendRoutes,
    };
  }

  @Get('navigation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get navigation menu',
    description: 'Get dynamic navigation menu based on user claims'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Navigation menu retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        routes: { type: 'array', items: { type: 'string' } },
        menuItems: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              route: { type: 'string' },
              icon: { type: 'string' },
              children: { type: 'array' }
            }
          }
        }
      }
    }
  })
  async getNavigation(@Request() req) {
    const { claims, frontendRoutes } = req.user;
    
    // Build dynamic navigation based on claims
    const menuItems = this.buildNavigationMenu(claims, frontendRoutes);
    
    return {
      routes: frontendRoutes,
      menuItems,
    };
  }

  private buildNavigationMenu(claims: string[], routes: string[]) {
    const menuItems = [];

    // Dashboard (always available)
    menuItems.push({
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard',
    });

    // Students section
    if (claims.some(c => c.startsWith('students.'))) {
      const studentMenu = {
        label: 'Students',
        icon: 'people',
        children: [],
      };

      if (claims.includes('students.view_all')) {
        studentMenu.children.push({
          label: 'All Students',
          route: '/students',
        });
      }

      if (claims.includes('students.view_own')) {
        studentMenu.children.push({
          label: 'My Profile',
          route: '/student/profile',
        });
      }

      if (claims.includes('students.create')) {
        studentMenu.children.push({
          label: 'Add Student',
          route: '/admin/students/create',
        });
      }

      if (studentMenu.children.length > 0) {
        menuItems.push(studentMenu);
      }
    }

    // Courses section
    if (claims.some(c => c.startsWith('courses.'))) {
      const courseMenu = {
        label: 'Courses',
        icon: 'book',
        children: [],
      };

      if (claims.includes('courses.view_all')) {
        courseMenu.children.push({
          label: 'All Courses',
          route: '/courses',
        });
      }

      if (claims.includes('courses.create')) {
        courseMenu.children.push({
          label: 'Create Course',
          route: '/instructor/courses/create',
        });
      }

      if (courseMenu.children.length > 0) {
        menuItems.push(courseMenu);
      }
    }

    // Assessments section
    if (claims.some(c => c.startsWith('assessments.'))) {
      const assessmentMenu = {
        label: 'Assessments',
        icon: 'assignment',
        children: [],
      };

      if (claims.includes('assessments.view_all')) {
        assessmentMenu.children.push({
          label: 'All Assessments',
          route: '/assessments',
        });
      }

      if (claims.includes('assessments.view_own')) {
        assessmentMenu.children.push({
          label: 'My Assessments',
          route: '/student/assessments',
        });
      }

      if (claims.includes('assessments.create')) {
        assessmentMenu.children.push({
          label: 'Create Assessment',
          route: '/instructor/assessments/create',
        });
      }

      if (claims.includes('assessments.grade')) {
        assessmentMenu.children.push({
          label: 'Grading',
          route: '/instructor/grading',
        });
      }

      if (assessmentMenu.children.length > 0) {
        menuItems.push(assessmentMenu);
      }
    }

    // Reports section
    if (claims.some(c => c.startsWith('reports.'))) {
      const reportMenu = {
        label: 'Reports',
        icon: 'analytics',
        children: [],
      };

      if (claims.includes('reports.view_all')) {
        reportMenu.children.push({
          label: 'All Reports',
          route: '/admin/reports',
        });
      }

      if (claims.includes('reports.student_progress')) {
        reportMenu.children.push({
          label: 'Student Progress',
          route: '/reports/student-progress',
        });
      }

      if (reportMenu.children.length > 0) {
        menuItems.push(reportMenu);
      }
    }

    // Administration section
    if (claims.some(c => c.startsWith('system.') || c.startsWith('users.'))) {
      const adminMenu = {
        label: 'Administration',
        icon: 'settings',
        children: [],
      };

      if (claims.includes('users.view_all')) {
        adminMenu.children.push({
          label: 'User Management',
          route: '/admin/users',
        });
      }

      if (claims.includes('system.settings')) {
        adminMenu.children.push({
          label: 'System Settings',
          route: '/admin/settings',
        });
      }

      if (adminMenu.children.length > 0) {
        menuItems.push(adminMenu);
      }
    }

    // Communication section
    if (claims.some(c => c.startsWith('communication.'))) {
      menuItems.push({
        label: 'Messages',
        route: '/messages',
        icon: 'mail',
      });
    }

    return menuItems;
  }
}

