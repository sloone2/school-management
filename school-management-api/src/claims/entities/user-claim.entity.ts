import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Claim } from './claim.entity';

@Entity('user_claims')
@Unique(['user', 'claim']) // Prevent duplicate claims for same user
export class UserClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.claims, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Claim, (claim) => claim.userClaims, {
    eager: true,
  })
  @JoinColumn({ name: 'claimId' })
  claim: Claim;

  @Column()
  claimId: string;

  @Column({ nullable: true })
  grantedBy: string; // User ID who granted this claim

  @Column({ nullable: true })
  context: string; // Additional context (e.g., specific school, class)

  @Column('simple-json', { nullable: true })
  parameters: Record<string, any>; // Additional parameters for the claim

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt: Date; // Optional expiration date

  @CreateDateColumn()
  grantedAt: Date;

  // Helper methods
  get isExpired(): boolean {
    return this.expiresAt ? new Date() > this.expiresAt : false;
  }

  get isValid(): boolean {
    return this.isActive && !this.isExpired;
  }
}

