import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClaimsService } from './claims.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClaimsGuard } from '../auth/guards/claims.guard';
import { RequireClaims } from '../auth/decorators/claims.decorator';
import { ClaimCategory } from './entities/claim.entity';

@ApiTags('Claims Management')
@Controller('claims')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClaimsController {
  constructor(private claimsService: ClaimsService) {}

  @Get()
  @UseGuards(ClaimsGuard)
  @RequireClaims('system.admin')
  @ApiOperation({ summary: 'Get all claims' })
  @ApiResponse({ status: 200, description: 'Claims retrieved successfully' })
  async getAllClaims() {
    return this.claimsService.getAllClaims();
  }

  @Get('category/:category')
  @UseGuards(ClaimsGuard)
  @RequireClaims('system.admin', 'users.view_all')
  @ApiOperation({ summary: 'Get claims by category' })
  @ApiResponse({ status: 200, description: 'Claims retrieved successfully' })
  async getClaimsByCategory(@Param('category') category: ClaimCategory) {
    return this.claimsService.getClaimsByCategory(category);
  }

  @Get('user/:userId')
  @UseGuards(ClaimsGuard)
  @RequireClaims('system.admin', 'users.view_all')
  @ApiOperation({ summary: 'Get user claims' })
  @ApiResponse({ status: 200, description: 'User claims retrieved successfully' })
  async getUserClaims(@Param('userId') userId: string) {
    return this.claimsService.getUserClaims(userId);
  }

  @Post('grant')
  @UseGuards(ClaimsGuard)
  @RequireClaims('system.admin')
  @ApiOperation({ summary: 'Grant claim to user' })
  @ApiResponse({ status: 201, description: 'Claim granted successfully' })
  async grantClaim(@Body() grantClaimDto: {
    userId: string;
    claimName: string;
    grantedBy: string;
    context?: string;
  }) {
    return this.claimsService.grantClaim(
      grantClaimDto.userId,
      grantClaimDto.claimName,
      grantClaimDto.grantedBy,
      grantClaimDto.context,
    );
  }

  @Delete('revoke')
  @UseGuards(ClaimsGuard)
  @RequireClaims('system.admin')
  @ApiOperation({ summary: 'Revoke claim from user' })
  @ApiResponse({ status: 200, description: 'Claim revoked successfully' })
  async revokeClaim(@Body() revokeClaimDto: {
    userId: string;
    claimName: string;
  }) {
    await this.claimsService.revokeClaim(
      revokeClaimDto.userId,
      revokeClaimDto.claimName,
    );
    return { message: 'Claim revoked successfully' };
  }

  @Post('initialize')
  @UseGuards(ClaimsGuard)
  @RequireClaims('system.admin')
  @ApiOperation({ 
    summary: 'Initialize default claims',
    description: 'Initialize the system with default claims (run once during setup)'
  })
  @ApiResponse({ status: 201, description: 'Default claims initialized successfully' })
  async initializeDefaultClaims() {
    await this.claimsService.initializeDefaultClaims();
    return { message: 'Default claims initialized successfully' };
  }
}

