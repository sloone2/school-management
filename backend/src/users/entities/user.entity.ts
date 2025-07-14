import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserClaim } from '../../claims/entities/user-claim.entity';
import { Student } from './student.entity';
import { Staff } from './staff.entity';
import { Parent } from './parent.entity';

export enum UserType {
  STAFF = 'staff',
  PARENT = 'parent',
  STUDENT = 'student',
}

export enum UserRole {
  // Staff roles
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  
  // Parent role
  PARENT = 'parent',
  
  // Student role
  STUDENT = 'student',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole; // This is just a label for display

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => UserClaim, (userClaim) => userClaim.user, {
    cascade: true,
    eager: true,
  })
  claims: UserClaim[];

  @OneToOne(() => Student, (student) => student.user, {
    nullable: true,
    cascade: true,
  })
  student: Student;

  @OneToOne(() => Staff, (staff) => staff.user, {
    nullable: true,
    cascade: true,
  })
  staff: Staff;

  @OneToOne(() => Parent, (parent) => parent.user, {
    nullable: true,
    cascade: true,
  })
  parent: Parent;

  // Helper methods
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasClaim(claimName: string): boolean {
    return this.claims.some(claim => claim.claim.name === claimName);
  }

  hasAnyClaim(claimNames: string[]): boolean {
    return claimNames.some(claimName => this.hasClaim(claimName));
  }

  hasAllClaims(claimNames: string[]): boolean {
    return claimNames.every(claimName => this.hasClaim(claimName));
  }

  getClaimsByCategory(category: string): UserClaim[] {
    return this.claims.filter(userClaim => userClaim.claim.category === category);
  }

  getFrontendRoutes(): string[] {
    return this.claims
      .map(userClaim => userClaim.claim.frontendRoute)
      .filter(route => route !== null && route !== undefined);
  }
}

