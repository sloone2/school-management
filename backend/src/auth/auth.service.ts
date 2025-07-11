import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserType, UserRole } from '../users/entities/user.entity';
import { Student } from '../users/entities/student.entity';
import { Staff } from '../users/entities/staff.entity';
import { Parent } from '../users/entities/parent.entity';
import { ClaimsService } from '../claims/claims.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto, PublicUserType } from './dto/register.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  userType: UserType;
  role: UserRole;
  claims: string[];
  frontendRoutes: string[];
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    role: UserRole;
    claims: string[];
    frontendRoutes: string[];
    children?: Array<{
      id: string;
      firstName: string;
      lastName: string;
      studentId: string;
      grade: string;
    }>; // For parents - list of children they can manage
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
    private jwtService: JwtService,
    private claimsService: ClaimsService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Update last login
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    return user;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, userType, ...userData } = registerDto;

    // Validate that only student or parent can register publicly
    if (!Object.values(PublicUserType).includes(userType as PublicUserType)) {
      throw new BadRequestException('Only students and parents can register through public registration');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userType: userType as UserType,
      role: this.getUserRoleFromType(userType as UserType),
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Create specific user type record
    await this.createUserTypeRecord(savedUser, userType as UserType, userData);

    // Assign default claims
    await this.claimsService.assignDefaultClaims(savedUser);

    // Reload user with claims
    const userWithClaims = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['claims', 'claims.claim'],
    });

    return this.generateAuthResponse(userWithClaims);
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    const claims = user.claims?.map(uc => uc.claim.name) || [];
    const frontendRoutes = user.claims?.map(uc => uc.claim.frontendRoute).filter(route => route) || [];

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
      role: user.role,
      claims,
      frontendRoutes,
    };

    const access_token = this.jwtService.sign(payload);

    const authResponse: AuthResponse = {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        role: user.role,
        claims,
        frontendRoutes,
      },
    };

    // If user is a parent, include their children information
    if (user.userType === UserType.PARENT) {
      const parent = await this.parentRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['children', 'children.user'],
      });

      if (parent?.children) {
        authResponse.user.children = parent.children.map(child => ({
          id: child.id,
          firstName: child.user.firstName,
          lastName: child.user.lastName,
          studentId: child.studentId,
          grade: child.grade,
        }));
      }
    }

    return authResponse;
  }

  private getUserRoleFromType(userType: UserType): UserRole {
    switch (userType) {
      case UserType.STUDENT:
        return UserRole.STUDENT;
      case UserType.PARENT:
        return UserRole.PARENT;
      case UserType.STAFF:
        return UserRole.INSTRUCTOR; // Default for staff
      default:
        return UserRole.STUDENT;
    }
  }

  private async createUserTypeRecord(user: User, userType: UserType, userData: any): Promise<void> {
    switch (userType) {
      case UserType.STUDENT:
        const student = this.studentRepository.create({
          user,
          studentId: userData.studentId,
          grade: userData.grade,
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
          canLoginDirectly: true, // Allow direct login for public registration
        });
        await this.studentRepository.save(student);
        break;

      case UserType.PARENT:
        const parent = this.parentRepository.create({
          user,
          phone: userData.phone,
          relationship: userData.relationship,
          emergencyContact: userData.emergencyContact,
        });
        await this.parentRepository.save(parent);
        break;

      default:
        throw new BadRequestException(`User type ${userType} is not allowed for public registration`);
    }
  }

  async buildNavigationMenu(user: User): Promise<any> {
    const claims = user.claims?.map(uc => uc.claim.name) || [];
    
    const menuItems = [];

    // Dashboard - available to all
    menuItems.push({
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    });

    // Students section
    if (claims.includes('students.view_all') || claims.includes('students.view_own')) {
      const studentsMenu = {
        label: 'Students',
        icon: 'people',
        children: [],
      };

      if (claims.includes('students.view_all')) {
        studentsMenu.children.push({
          label: 'All Students',
          route: '/students',
        });
      }

      if (claims.includes('students.view_own')) {
        studentsMenu.children.push({
          label: 'My Children',
          route: '/students/my-children',
        });
      }

      if (claims.includes('students.create')) {
        studentsMenu.children.push({
          label: 'Add Student',
          route: '/students/create',
        });
      }

      menuItems.push(studentsMenu);
    }

    // Courses section
    if (claims.includes('courses.view_all') || claims.includes('courses.create')) {
      const coursesMenu = {
        label: 'Courses',
        icon: 'book',
        children: [],
      };

      coursesMenu.children.push({
        label: 'All Courses',
        route: '/courses',
      });

      if (claims.includes('courses.create')) {
        coursesMenu.children.push({
          label: 'Create Course',
          route: '/courses/create',
        });
      }

      menuItems.push(coursesMenu);
    }

    // Assessments section
    if (claims.includes('assessments.view_all') || claims.includes('assessments.view_own')) {
      const assessmentsMenu = {
        label: 'Assessments',
        icon: 'assignment',
        children: [],
      };

      if (claims.includes('assessments.view_all')) {
        assessmentsMenu.children.push({
          label: 'All Assessments',
          route: '/assessments',
        });
      }

      if (claims.includes('assessments.view_own')) {
        assessmentsMenu.children.push({
          label: 'My Assessments',
          route: '/assessments/my-assessments',
        });
      }

      if (claims.includes('assessments.create')) {
        assessmentsMenu.children.push({
          label: 'Create Assessment',
          route: '/assessments/create',
        });
      }

      menuItems.push(assessmentsMenu);
    }

    // Reports section
    if (claims.includes('reports.view_all') || claims.includes('reports.student_progress')) {
      menuItems.push({
        label: 'Reports',
        icon: 'analytics',
        route: '/reports',
      });
    }

    // Admin section
    if (claims.includes('system.admin')) {
      const adminMenu = {
        label: 'Administration',
        icon: 'settings',
        children: [
          {
            label: 'User Management',
            route: '/admin/users',
          },
          {
            label: 'Claims Management',
            route: '/admin/claims',
          },
          {
            label: 'System Settings',
            route: '/admin/settings',
          },
        ],
      };

      menuItems.push(adminMenu);
    }

    return {
      routes: user.claims?.map(uc => uc.claim.frontendRoute).filter(route => route) || [],
      menuItems,
    };
  }
}

