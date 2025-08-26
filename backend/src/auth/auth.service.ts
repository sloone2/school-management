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
import { RegisterDto } from './dto/register.dto';

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
    canManageStudents?: string[]; // For parents - list of student IDs they can manage
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

    // Handle student direct login
    if (user.userType === UserType.STUDENT) {
      const student = await this.studentRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user'],
      });

      if (!student?.canLoginDirectly) {
        throw new UnauthorizedException('Student direct login is not allowed. Please use parent account.');
      }
    }

    return this.generateAuthResponse(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, userType, ...userData } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Convert PublicUserType to UserType
    let actualUserType: UserType;
    if (userType === 'student') {
      actualUserType = UserType.STUDENT;
    } else if (userType === 'parent') {
      actualUserType = UserType.PARENT;
    } else {
      throw new BadRequestException('Invalid user type. Only STUDENT and PARENT are allowed for public registration.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userType: actualUserType,
      role: this.getUserRoleFromType(actualUserType),
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Create specific user type record
    await this.createUserTypeRecord(savedUser, actualUserType, userData);

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
    const claims = user.claims
      .filter(uc => uc.isValid)
      .map(uc => uc.claim.name);
    
    const frontendRoutes = user.getFrontendRoutes();

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
      role: user.role,
      claims,
      frontendRoutes,
    };

    const token = this.jwtService.sign(payload);

    const response: AuthResponse = {
      access_token: token,
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

    // Add parent-specific data
    if (user.userType === UserType.PARENT && user.parent) {
      const parentWithChildren = await this.parentRepository.findOne({
        where: { id: user.parent.id },
        relations: ['children'],
      });
      response.user.canManageStudents = parentWithChildren?.children.map(child => child.id) || [];
    }

    return response;
  }

  private getUserRoleFromType(userType: UserType): UserRole {
    switch (userType) {
      case UserType.STAFF:
        return UserRole.INSTRUCTOR; // Default, can be changed later
      case UserType.PARENT:
        return UserRole.PARENT;
      case UserType.STUDENT:
        return UserRole.STUDENT;
      default:
        return UserRole.STUDENT;
    }
  }

  private async createUserTypeRecord(user: User, userType: UserType, userData: any): Promise<void> {
    switch (userType) {
      case UserType.STUDENT:
        const student = this.studentRepository.create({
          user,
          studentId: userData.studentId || `STU${Date.now()}`,
          dateOfBirth: userData.dateOfBirth,
          grade: userData.grade,
          canLoginDirectly: userData.canLoginDirectly || false,
        });
        await this.studentRepository.save(student);
        break;

      case UserType.STAFF:
        const staff = this.staffRepository.create({
          user,
          employeeId: userData.employeeId || `EMP${Date.now()}`,
          staffType: userData.staffType,
          department: userData.department,
          position: userData.position,
        });
        await this.staffRepository.save(staff);
        break;

      case UserType.PARENT:
        const parent = this.parentRepository.create({
          user,
          phone: userData.phone,
          relationship: userData.relationship,
        });
        await this.parentRepository.save(parent);
        break;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
    });
  }
}

