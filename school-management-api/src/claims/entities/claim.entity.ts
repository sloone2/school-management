import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserClaim } from './user-claim.entity';

export enum ClaimCategory {
  USERS = 'users',
  STUDENTS = 'students',
  COURSES = 'courses',
  ASSESSMENTS = 'assessments',
  REPORTS = 'reports',
  SYSTEM = 'system',
  COMMUNICATION = 'communication',
}

export enum ClaimAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage', // Full CRUD access
  VIEW_ALL = 'view_all', // Can view all records
  VIEW_OWN = 'view_own', // Can only view own records
  APPROVE = 'approve',
  REJECT = 'reject',
}

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // e.g., "courses.create", "students.view_all"

  @Column()
  displayName: string; // Human-readable name

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ClaimCategory,
  })
  category: ClaimCategory;

  @Column({
    type: 'enum',
    enum: ClaimAction,
  })
  action: ClaimAction;

  @Column({ nullable: true })
  frontendRoute: string; // Angular route this claim unlocks

  @Column({ nullable: true })
  frontendComponent: string; // Angular component this claim shows

  @Column('simple-array', { nullable: true })
  requiredParams: string[]; // Parameters needed for this claim

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 1 })
  priority: number; // For ordering in UI

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => UserClaim, (userClaim) => userClaim.claim)
  userClaims: UserClaim[];

  // Helper methods
  get fullName(): string {
    return `${this.category}.${this.action}`;
  }

  static createClaimName(category: ClaimCategory, action: ClaimAction, resource?: string): string {
    return resource ? `${category}.${resource}.${action}` : `${category}.${action}`;
  }
}

