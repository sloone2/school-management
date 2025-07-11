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
import { Student } from './student.entity';

export enum ParentRelationship {
  FATHER = 'father',
  MOTHER = 'mother',
  GUARDIAN = 'guardian',
  STEPFATHER = 'stepfather',
  STEPMOTHER = 'stepmother',
  GRANDPARENT = 'grandparent',
  OTHER = 'other',
}

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  workPhone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  workplace: string;

  @Column({
    type: 'enum',
    enum: ParentRelationship,
    default: ParentRelationship.GUARDIAN,
  })
  relationship: ParentRelationship;

  @Column({ default: true })
  isPrimaryContact: boolean;

  @Column({ default: true })
  canPickupStudent: boolean;

  @Column({ default: true })
  receiveNotifications: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => User, (user) => user.parent)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Student, (student) => student.parents)
  @JoinTable({
    name: 'parent_student',
    joinColumn: {
      name: 'parentId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'studentId',
      referencedColumnName: 'id',
    },
  })
  children: Student[];

  // Helper methods
  get displayName(): string {
    return `${this.user?.fullName} (${this.relationship})`;
  }

  get childrenCount(): number {
    return this.children?.length || 0;
  }
}

