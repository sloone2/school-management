import { 
  IsEmail, 
  IsString, 
  MinLength, 
  IsEnum, 
  IsOptional, 
  IsBoolean,
  IsDateString,
  ValidateIf 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from '../../users/entities/user.entity';
import { ParentRelationship } from '../../users/entities/parent.entity';

// Restricted user types for public registration
export enum PublicUserType {
  STUDENT = 'student',
  PARENT = 'parent',
}

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    enum: PublicUserType,
    example: PublicUserType.STUDENT,
    description: 'Type of user (only STUDENT and PARENT allowed for public registration)',
  })
  @IsEnum(PublicUserType)
  userType: PublicUserType;

  // Student-specific fields
  @ApiPropertyOptional({
    example: 'STU001',
    description: 'Student ID (required for students)',
  })
  @ValidateIf(o => o.userType === PublicUserType.STUDENT)
  @IsString()
  studentId?: string;

  @ApiPropertyOptional({
    example: '2010-01-01',
    description: 'Date of birth (for students)',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    example: 'Grade 5',
    description: 'Current grade (for students)',
  })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether student can login directly without parent',
  })
  @IsOptional()
  @IsBoolean()
  canLoginDirectly?: boolean;

  // Parent-specific fields
  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number (for parents)',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    enum: ParentRelationship,
    example: ParentRelationship.FATHER,
    description: 'Relationship to student (for parents)',
  })
  @ValidateIf(o => o.userType === PublicUserType.PARENT)
  @IsEnum(ParentRelationship)
  relationship?: ParentRelationship;
}

