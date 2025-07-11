import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum StaffType {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  COUNSELOR = 'counselor',
  LIBRARIAN = 'librarian',
  NURSE = 'nurse',
  SECURITY = 'security',
  MAINTENANCE = 'maintenance',
  OTHER = 'other',
}

export enum EmploymentStatus {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  SUBSTITUTE = 'substitute',
  INTERN = 'intern',
}

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  employeeId: string; // School-specific employee ID

  @Column({
    type: 'enum',
    enum: StaffType,
  })
  staffType: StaffType;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({
    type: 'enum',
    enum: EmploymentStatus,
    default: EmploymentStatus.FULL_TIME,
  })
  employmentStatus: EmploymentStatus;

  @Column({ nullable: true })
  hireDate: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  officeLocation: string;

  @Column({ nullable: true })
  officeHours: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  emergencyPhone: string;

  @Column('simple-array', { nullable: true })
  qualifications: string[]; // Degrees, certifications, etc.

  @Column('simple-array', { nullable: true })
  subjects: string[]; // Subjects they can teach

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn()
  user: User;

  // Helper methods
  get displayName(): string {
    return `${this.user?.fullName} (${this.employeeId})`;
  }

  get isInstructor(): boolean {
    return this.staffType === StaffType.INSTRUCTOR;
  }

  get isAdmin(): boolean {
    return this.staffType === StaffType.ADMIN;
  }
}

