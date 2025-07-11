import { SetMetadata } from '@nestjs/common';

export const CLAIMS_KEY = 'claims';

/**
 * Decorator to specify required claims for a route
 * User needs at least ONE of the specified claims
 */
export const RequireClaims = (...claims: string[]) => SetMetadata(CLAIMS_KEY, claims);

/**
 * Decorator to specify required claims for a route
 * User needs ALL of the specified claims
 */
export const RequireAllClaims = (...claims: string[]) => SetMetadata(CLAIMS_KEY, claims);

