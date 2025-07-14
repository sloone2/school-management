import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClaimsGuard } from '../auth/guards/claims.guard';
import { RequireClaims } from '../auth/decorators/claims.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(ClaimsGuard)
  @RequireClaims('users.view_all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(ClaimsGuard)
  @RequireClaims('users.view_all', 'students.view_own')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('students/all')
  @UseGuards(ClaimsGuard)
  @RequireClaims('students.view_all')
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
  async findStudents() {
    return this.usersService.findStudents();
  }

  @Get('staff/all')
  @UseGuards(ClaimsGuard)
  @RequireClaims('users.view_all')
  @ApiOperation({ summary: 'Get all staff' })
  @ApiResponse({ status: 200, description: 'Staff retrieved successfully' })
  async findStaff() {
    return this.usersService.findStaff();
  }

  @Get('parents/all')
  @UseGuards(ClaimsGuard)
  @RequireClaims('users.view_all')
  @ApiOperation({ summary: 'Get all parents' })
  @ApiResponse({ status: 200, description: 'Parents retrieved successfully' })
  async findParents() {
    return this.usersService.findParents();
  }
}

