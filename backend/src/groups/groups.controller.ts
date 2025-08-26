import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClaimsGuard } from '../auth/guards/claims.guard';
import { RequireClaims } from '../auth/decorators/claims.decorator';

@ApiTags('Groups')
@Controller('groups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.create')
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({ status: 201, description: 'Group created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.view_all')
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, description: 'Groups retrieved successfully' })
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get('active')
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.view_all')
  @ApiOperation({ summary: 'Get all active groups' })
  @ApiResponse({ status: 200, description: 'Active groups retrieved successfully' })
  async findActive() {
    return this.groupsService.findActive();
  }

  @Get(':id')
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.view_all')
  @ApiOperation({ summary: 'Get group by ID' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.update')
  @ApiOperation({ summary: 'Update group by ID' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group updated successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.update')
  @ApiOperation({ summary: 'Toggle group active status' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 200, description: 'Group status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async toggleActive(@Param('id') id: string) {
    return this.groupsService.toggleActive(id);
  }

  @Delete(':id')
  @UseGuards(ClaimsGuard)
  @RequireClaims('groups.delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete group by ID' })
  @ApiParam({ name: 'id', description: 'Group ID' })
  @ApiResponse({ status: 204, description: 'Group deleted successfully' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}

