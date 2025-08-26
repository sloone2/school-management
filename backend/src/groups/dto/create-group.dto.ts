import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ description: 'Group title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Group description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Group active status', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

