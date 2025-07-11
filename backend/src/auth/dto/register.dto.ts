import { 
  IsEmail, 
  IsString, 
  MinLength, 
  IsEnum, 
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PublicUserType {
  STUDENT = 'student',
  PARENT = 'parent',
}

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@school.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User type - only student or parent allowed for public registration',
    enum: PublicUserType,
    example: PublicUserType.STUDENT,
  })
  @IsEnum(PublicUserType)
  userType: PublicUserType;

  // Student-specific fields
  @ApiPropertyOptional({
    description: 'Student ID (required for student registration)',
    example: 'STU001',
  })
  @ValidateIf(o => o.userType === PublicUserType.STUDENT)
  @IsString()
  studentId?: string;

  @ApiPropertyOptional({
    description: 'Student grade (required for student registration)',
    example: 'Grade 10',
  })
  @ValidateIf(o => o.userType === PublicUserType.STUDENT)
  @IsString()
  grade?: string;

  @ApiPropertyOptional({
    description: 'Date of birth (for student registration)',
    example: '2005-01-15',
  })
  @ValidateIf(o => o.userType === PublicUserType.STUDENT)
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  // Parent-specific fields
  @ApiPropertyOptional({
    description: 'Phone number (required for parent registration)',
    example: '+1234567890',
  })
  @ValidateIf(o => o.userType === PublicUserType.PARENT)
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Relationship to student (required for parent registration)',
    example: 'father',
  })
  @ValidateIf(o => o.userType === PublicUserType.PARENT)
  @IsString()
  relationship?: string;

  @ApiPropertyOptional({
    description: 'Emergency contact (for parent registration)',
    example: '+1234567891',
  })
  @ValidateIf(o => o.userType === PublicUserType.PARENT)
  @IsOptional()
  @IsString()
  emergencyContact?: string;
}

