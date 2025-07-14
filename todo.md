# School Management System Authentication Changes

## Backend Changes
- [x] Remove loginAsStudent field from LoginDto
- [x] Update RegisterDto to restrict user types to STUDENT and PARENT only
- [x] Update auth service to remove loginAsStudent logic
- [x] Update auth controller documentation

## Frontend Changes
- [x] Create axios instance with JWT interceptor
- [x] Implement proper login component with API integration
- [x] Implement proper register component with API integration
- [x] Add user type selection (STUDENT/PARENT only) to registration
- [x] Add email field to registration form
- [x] Update auth routing and modules

## Testing and Deployment
- [ ] Test the authentication flow
- [ ] Create git patch with all changes

