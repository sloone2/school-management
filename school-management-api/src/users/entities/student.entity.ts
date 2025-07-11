import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Parent } from './parent.entity';

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  GRADUATED = 'graduated',
  TRANSFERRED = 'transferred',
  SUSPENDED = 'suspended',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  studentId: string; // School-specific student ID

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  grade: string; // Current grade/class

  @Column({ nullable: true })
  section: string; // Class section

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.ACTIVE,
  })
  status: StudentStatus;

  @Column({ nullable: true })
  enrollmentDate: Date;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  emergencyPhone: string;

  @Column({ default: false })
  canLoginDirectly: boolean; // Whether student can login without parent

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Parent, (parent) => parent.children)
  parents: Parent[];

  // Helper methods
  get isActive(): boolean {
    return this.status === StudentStatus.ACTIVE;
  }

  get displayName(): string {
    return `${this.user?.fullName} (${this.studentId})`;
  }
}

