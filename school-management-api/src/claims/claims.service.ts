import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim, ClaimCategory, ClaimAction } from './entities/claim.entity';
import { UserClaim } from './entities/user-claim.entity';
import { User, UserType, UserRole } from '../users/entities/user.entity';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
    @InjectRepository(UserClaim)
    private userClaimRepository: Repository<UserClaim>,
  ) {}

  async initializeDefaultClaims(): Promise<void> {
    const defaultClaims = this.getDefaultClaimsDefinition();
    
    for (const claimData of defaultClaims) {
      const existingClaim = await this.claimRepository.findOne({
        where: { name: claimData.name },
      });

      if (!existingClaim) {
        const claim = this.claimRepository.create(claimData);
        await this.claimRepository.save(claim);
      }
    }
  }

  async assignDefaultClaims(user: User): Promise<void> {
    const defaultClaimNames = this.getDefaultClaimsForUserType(user.userType, user.role);
    
    for (const claimName of defaultClaimNames) {
      const claim = await this.claimRepository.findOne({
        where: { name: claimName },
      });

      if (claim) {
        const existingUserClaim = await this.userClaimRepository.findOne({
          where: { userId: user.id, claimId: claim.id },
        });

        if (!existingUserClaim) {
          const userClaim = this.userClaimRepository.create({
            userId: user.id,
            claimId: claim.id,
            grantedBy: 'system',
            isActive: true,
          });
          await this.userClaimRepository.save(userClaim);
        }
      }
    }
  }

  async grantClaim(userId: string, claimName: string, grantedBy: string, context?: string): Promise<UserClaim> {
    const claim = await this.claimRepository.findOne({
      where: { name: claimName },
    });

    if (!claim) {
      throw new NotFoundException(`Claim '${claimName}' not found`);
    }

    const existingUserClaim = await this.userClaimRepository.findOne({
      where: { userId, claimId: claim.id },
    });

    if (existingUserClaim) {
      existingUserClaim.isActive = true;
      existingUserClaim.grantedBy = grantedBy;
      existingUserClaim.context = context;
      return this.userClaimRepository.save(existingUserClaim);
    }

    const userClaim = this.userClaimRepository.create({
      userId,
      claimId: claim.id,
      grantedBy,
      context,
      isActive: true,
    });

    return this.userClaimRepository.save(userClaim);
  }

  async revokeClaim(userId: string, claimName: string): Promise<void> {
    const claim = await this.claimRepository.findOne({
      where: { name: claimName },
    });

    if (!claim) {
      throw new NotFoundException(`Claim '${claimName}' not found`);
    }

    await this.userClaimRepository.update(
      { userId, claimId: claim.id },
      { isActive: false }
    );
  }

  async getUserClaims(userId: string): Promise<UserClaim[]> {
    return this.userClaimRepository.find({
      where: { userId, isActive: true },
      relations: ['claim'],
    });
  }

  async getUserClaimsByCategory(userId: string, category: ClaimCategory): Promise<UserClaim[]> {
    return this.userClaimRepository.find({
      where: { 
        userId, 
        isActive: true,
        claim: { category }
      },
      relations: ['claim'],
    });
  }

  async getAllClaims(): Promise<Claim[]> {
    return this.claimRepository.find({
      where: { isActive: true },
      order: { category: 'ASC', priority: 'ASC' },
    });
  }

  async getClaimsByCategory(category: ClaimCategory): Promise<Claim[]> {
    return this.claimRepository.find({
      where: { category, isActive: true },
      order: { priority: 'ASC' },
    });
  }

  private getDefaultClaimsDefinition(): Partial<Claim>[] {
    return [
      // User Management Claims
      {
        name: 'users.view_all',
        displayName: 'View All Users',
        description: 'Can view all users in the system',
        category: ClaimCategory.USERS,
        action: ClaimAction.VIEW_ALL,
        frontendRoute: '/admin/users',
        priority: 1,
      },
      {
        name: 'users.create',
        displayName: 'Create Users',
        description: 'Can create new users',
        category: ClaimCategory.USERS,
        action: ClaimAction.CREATE,
        frontendRoute: '/admin/users/create',
        priority: 2,
      },
      {
        name: 'users.update',
        displayName: 'Update Users',
        description: 'Can update user information',
        category: ClaimCategory.USERS,
        action: ClaimAction.UPDATE,
        priority: 3,
      },
      {
        name: 'users.delete',
        displayName: 'Delete Users',
        description: 'Can delete users',
        category: ClaimCategory.USERS,
        action: ClaimAction.DELETE,
        priority: 4,
      },

      // Student Management Claims
      {
        name: 'students.view_all',
        displayName: 'View All Students',
        description: 'Can view all students',
        category: ClaimCategory.STUDENTS,
        action: ClaimAction.VIEW_ALL,
        frontendRoute: '/students',
        priority: 1,
      },
      {
        name: 'students.view_own',
        displayName: 'View Own Student Profile',
        description: 'Can view own student profile',
        category: ClaimCategory.STUDENTS,
        action: ClaimAction.VIEW_OWN,
        frontendRoute: '/student/profile',
        priority: 2,
      },
      {
        name: 'students.create',
        displayName: 'Create Students',
        description: 'Can create new student records',
        category: ClaimCategory.STUDENTS,
        action: ClaimAction.CREATE,
        frontendRoute: '/admin/students/create',
        priority: 3,
      },
      {
        name: 'students.update',
        displayName: 'Update Students',
        description: 'Can update student information',
        category: ClaimCategory.STUDENTS,
        action: ClaimAction.UPDATE,
        priority: 4,
      },

      // Course Management Claims
      {
        name: 'courses.view_all',
        displayName: 'View All Courses',
        description: 'Can view all courses',
        category: ClaimCategory.COURSES,
        action: ClaimAction.VIEW_ALL,
        frontendRoute: '/courses',
        priority: 1,
      },
      {
        name: 'courses.create',
        displayName: 'Create Courses',
        description: 'Can create new courses',
        category: ClaimCategory.COURSES,
        action: ClaimAction.CREATE,
        frontendRoute: '/instructor/courses/create',
        priority: 2,
      },
      {
        name: 'courses.update',
        displayName: 'Update Courses',
        description: 'Can update course information',
        category: ClaimCategory.COURSES,
        action: ClaimAction.UPDATE,
        priority: 3,
      },
      {
        name: 'courses.delete',
        displayName: 'Delete Courses',
        description: 'Can delete courses',
        category: ClaimCategory.COURSES,
        action: ClaimAction.DELETE,
        priority: 4,
      },

      // Assessment Claims
      {
        name: 'assessments.view_all',
        displayName: 'View All Assessments',
        description: 'Can view all assessments',
        category: ClaimCategory.ASSESSMENTS,
        action: ClaimAction.VIEW_ALL,
        frontendRoute: '/assessments',
        priority: 1,
      },
      {
        name: 'assessments.view_own',
        displayName: 'View Own Assessments',
        description: 'Can view own assessments',
        category: ClaimCategory.ASSESSMENTS,
        action: ClaimAction.VIEW_OWN,
        frontendRoute: '/student/assessments',
        priority: 2,
      },
      {
        name: 'assessments.create',
        displayName: 'Create Assessments',
        description: 'Can create new assessments',
        category: ClaimCategory.ASSESSMENTS,
        action: ClaimAction.CREATE,
        frontendRoute: '/instructor/assessments/create',
        priority: 3,
      },
      {
        name: 'assessments.grade',
        displayName: 'Grade Assessments',
        description: 'Can grade student assessments',
        category: ClaimCategory.ASSESSMENTS,
        action: ClaimAction.UPDATE,
        frontendRoute: '/instructor/grading',
        priority: 4,
      },

      // Reports Claims
      {
        name: 'reports.view_all',
        displayName: 'View All Reports',
        description: 'Can view all system reports',
        category: ClaimCategory.REPORTS,
        action: ClaimAction.VIEW_ALL,
        frontendRoute: '/admin/reports',
        priority: 1,
      },
      {
        name: 'reports.student_progress',
        displayName: 'View Student Progress Reports',
        description: 'Can view student progress reports',
        category: ClaimCategory.REPORTS,
        action: ClaimAction.READ,
        frontendRoute: '/reports/student-progress',
        priority: 2,
      },

      // System Claims
      {
        name: 'system.admin',
        displayName: 'System Administration',
        description: 'Full system administration access',
        category: ClaimCategory.SYSTEM,
        action: ClaimAction.MANAGE,
        frontendRoute: '/admin/system',
        priority: 1,
      },
      {
        name: 'system.settings',
        displayName: 'System Settings',
        description: 'Can modify system settings',
        category: ClaimCategory.SYSTEM,
        action: ClaimAction.UPDATE,
        frontendRoute: '/admin/settings',
        priority: 2,
      },

      // Communication Claims
      {
        name: 'communication.send_messages',
        displayName: 'Send Messages',
        description: 'Can send messages to other users',
        category: ClaimCategory.COMMUNICATION,
        action: ClaimAction.CREATE,
        frontendRoute: '/messages/compose',
        priority: 1,
      },
      {
        name: 'communication.view_messages',
        displayName: 'View Messages',
        description: 'Can view received messages',
        category: ClaimCategory.COMMUNICATION,
        action: ClaimAction.READ,
        frontendRoute: '/messages',
        priority: 2,
      },
    ];
  }

  private getDefaultClaimsForUserType(userType: UserType, role: UserRole): string[] {
    const baseClaims = [
      'communication.view_messages',
      'communication.send_messages',
    ];

    switch (userType) {
      case UserType.STUDENT:
        return [
          ...baseClaims,
          'students.view_own',
          'assessments.view_own',
          'courses.view_all',
        ];

      case UserType.PARENT:
        return [
          ...baseClaims,
          'students.view_own', // Can view their children
          'assessments.view_own', // Can view their children's assessments
          'courses.view_all',
          'reports.student_progress',
        ];

      case UserType.STAFF:
        if (role === UserRole.ADMIN) {
          return [
            ...baseClaims,
            'users.view_all',
            'users.create',
            'users.update',
            'users.delete',
            'students.view_all',
            'students.create',
            'students.update',
            'courses.view_all',
            'courses.create',
            'courses.update',
            'courses.delete',
            'assessments.view_all',
            'assessments.create',
            'assessments.grade',
            'reports.view_all',
            'reports.student_progress',
            'system.admin',
            'system.settings',
          ];
        } else if (role === UserRole.INSTRUCTOR) {
          return [
            ...baseClaims,
            'students.view_all',
            'courses.view_all',
            'courses.create',
            'courses.update',
            'assessments.view_all',
            'assessments.create',
            'assessments.grade',
            'reports.student_progress',
          ];
        }
        break;
    }

    return baseClaims;
  }
}

