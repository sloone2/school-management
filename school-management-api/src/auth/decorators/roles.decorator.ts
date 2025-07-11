import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';

/**
 * Decorator to specify required roles for a route
 * User needs at least ONE of the specified roles
 */
export const RequireRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

