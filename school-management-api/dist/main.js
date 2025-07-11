/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const database_module_1 = __webpack_require__(/*! ./database/database.module */ "./src/database/database.module.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const claims_module_1 = __webpack_require__(/*! ./claims/claims.module */ "./src/claims/claims.module.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/users/users.module.ts");
const health_controller_1 = __webpack_require__(/*! ./health/health.controller */ "./src/health/health.controller.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            claims_module_1.ClaimsModule,
            users_module_1.UsersModule,
        ],
        controllers: [health_controller_1.HealthController],
    })
], AppModule);


/***/ }),

/***/ "./src/auth/auth.controller.ts":
/*!*************************************!*\
  !*** ./src/auth/auth.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./src/auth/dto/login.dto.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./src/auth/dto/register.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./guards/jwt-auth.guard */ "./src/auth/guards/jwt-auth.guard.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async getProfile(req) {
        return {
            id: req.user.id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            userType: req.user.userType,
            role: req.user.role,
            claims: req.user.claims,
            frontendRoutes: req.user.frontendRoutes,
        };
    }
    async getNavigation(req) {
        const { claims, frontendRoutes } = req.user;
        const menuItems = this.buildNavigationMenu(claims, frontendRoutes);
        return {
            routes: frontendRoutes,
            menuItems,
        };
    }
    buildNavigationMenu(claims, routes) {
        const menuItems = [];
        menuItems.push({
            label: 'Dashboard',
            route: '/dashboard',
            icon: 'dashboard',
        });
        if (claims.some(c => c.startsWith('students.'))) {
            const studentMenu = {
                label: 'Students',
                icon: 'people',
                children: [],
            };
            if (claims.includes('students.view_all')) {
                studentMenu.children.push({
                    label: 'All Students',
                    route: '/students',
                });
            }
            if (claims.includes('students.view_own')) {
                studentMenu.children.push({
                    label: 'My Profile',
                    route: '/student/profile',
                });
            }
            if (claims.includes('students.create')) {
                studentMenu.children.push({
                    label: 'Add Student',
                    route: '/admin/students/create',
                });
            }
            if (studentMenu.children.length > 0) {
                menuItems.push(studentMenu);
            }
        }
        if (claims.some(c => c.startsWith('courses.'))) {
            const courseMenu = {
                label: 'Courses',
                icon: 'book',
                children: [],
            };
            if (claims.includes('courses.view_all')) {
                courseMenu.children.push({
                    label: 'All Courses',
                    route: '/courses',
                });
            }
            if (claims.includes('courses.create')) {
                courseMenu.children.push({
                    label: 'Create Course',
                    route: '/instructor/courses/create',
                });
            }
            if (courseMenu.children.length > 0) {
                menuItems.push(courseMenu);
            }
        }
        if (claims.some(c => c.startsWith('assessments.'))) {
            const assessmentMenu = {
                label: 'Assessments',
                icon: 'assignment',
                children: [],
            };
            if (claims.includes('assessments.view_all')) {
                assessmentMenu.children.push({
                    label: 'All Assessments',
                    route: '/assessments',
                });
            }
            if (claims.includes('assessments.view_own')) {
                assessmentMenu.children.push({
                    label: 'My Assessments',
                    route: '/student/assessments',
                });
            }
            if (claims.includes('assessments.create')) {
                assessmentMenu.children.push({
                    label: 'Create Assessment',
                    route: '/instructor/assessments/create',
                });
            }
            if (claims.includes('assessments.grade')) {
                assessmentMenu.children.push({
                    label: 'Grading',
                    route: '/instructor/grading',
                });
            }
            if (assessmentMenu.children.length > 0) {
                menuItems.push(assessmentMenu);
            }
        }
        if (claims.some(c => c.startsWith('reports.'))) {
            const reportMenu = {
                label: 'Reports',
                icon: 'analytics',
                children: [],
            };
            if (claims.includes('reports.view_all')) {
                reportMenu.children.push({
                    label: 'All Reports',
                    route: '/admin/reports',
                });
            }
            if (claims.includes('reports.student_progress')) {
                reportMenu.children.push({
                    label: 'Student Progress',
                    route: '/reports/student-progress',
                });
            }
            if (reportMenu.children.length > 0) {
                menuItems.push(reportMenu);
            }
        }
        if (claims.some(c => c.startsWith('system.') || c.startsWith('users.'))) {
            const adminMenu = {
                label: 'Administration',
                icon: 'settings',
                children: [],
            };
            if (claims.includes('users.view_all')) {
                adminMenu.children.push({
                    label: 'User Management',
                    route: '/admin/users',
                });
            }
            if (claims.includes('system.settings')) {
                adminMenu.children.push({
                    label: 'System Settings',
                    route: '/admin/settings',
                });
            }
            if (adminMenu.children.length > 0) {
                menuItems.push(adminMenu);
            }
        }
        if (claims.some(c => c.startsWith('communication.'))) {
            menuItems.push({
                label: 'Messages',
                route: '/messages',
                icon: 'mail',
            });
        }
        return menuItems;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticate user and return JWT token. Supports parent login as student.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        userType: { type: 'string' },
                        role: { type: 'string' },
                        claims: { type: 'array', items: { type: 'string' } },
                        frontendRoutes: { type: 'array', items: { type: 'string' } },
                        canManageStudents: { type: 'array', items: { type: 'string' } }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'User registration',
        description: 'Register a new user (student, parent, or staff)'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Registration successful',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        userType: { type: 'string' },
                        role: { type: 'string' },
                        claims: { type: 'array', items: { type: 'string' } },
                        frontendRoutes: { type: 'array', items: { type: 'string' } }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Registration failed' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user profile',
        description: 'Get current authenticated user profile with claims and routes'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                userType: { type: 'string' },
                role: { type: 'string' },
                claims: { type: 'array', items: { type: 'string' } },
                frontendRoutes: { type: 'array', items: { type: 'string' } },
                canManageStudents: { type: 'array', items: { type: 'string' } }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('navigation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get navigation menu',
        description: 'Get dynamic navigation menu based on user claims'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Navigation menu retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                routes: { type: 'array', items: { type: 'string' } },
                menuItems: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            label: { type: 'string' },
                            route: { type: 'string' },
                            icon: { type: 'string' },
                            children: { type: 'array' }
                        }
                    }
                }
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNavigation", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/auth/auth.controller.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/auth/strategies/jwt.strategy.ts");
const user_entity_1 = __webpack_require__(/*! ../users/entities/user.entity */ "./src/users/entities/user.entity.ts");
const student_entity_1 = __webpack_require__(/*! ../users/entities/student.entity */ "./src/users/entities/student.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ../users/entities/staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ../users/entities/parent.entity */ "./src/users/entities/parent.entity.ts");
const claims_module_1 = __webpack_require__(/*! ../claims/claims.module */ "./src/claims/claims.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, student_entity_1.Student, staff_entity_1.Staff, parent_entity_1.Parent]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET', 'your-secret-key'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN', '24h'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            claims_module_1.ClaimsModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./src/auth/auth.service.ts":
/*!**********************************!*\
  !*** ./src/auth/auth.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
const user_entity_1 = __webpack_require__(/*! ../users/entities/user.entity */ "./src/users/entities/user.entity.ts");
const student_entity_1 = __webpack_require__(/*! ../users/entities/student.entity */ "./src/users/entities/student.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ../users/entities/staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ../users/entities/parent.entity */ "./src/users/entities/parent.entity.ts");
const claims_service_1 = __webpack_require__(/*! ../claims/claims.service */ "./src/claims/claims.service.ts");
let AuthService = class AuthService {
    constructor(userRepository, studentRepository, staffRepository, parentRepository, jwtService, claimsService) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.staffRepository = staffRepository;
        this.parentRepository = parentRepository;
        this.jwtService = jwtService;
        this.claimsService = claimsService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email, isActive: true },
            relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);
        return user;
    }
    async login(loginDto) {
        const { email, password, loginAsStudent } = loginDto;
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (loginAsStudent && user.userType === user_entity_1.UserType.PARENT) {
            return this.loginParentAsStudent(user, loginAsStudent);
        }
        if (user.userType === user_entity_1.UserType.STUDENT) {
            const student = await this.studentRepository.findOne({
                where: { user: { id: user.id } },
                relations: ['user'],
            });
            if (!student?.canLoginDirectly) {
                throw new common_1.UnauthorizedException('Student direct login is not allowed. Please use parent account.');
            }
        }
        return this.generateAuthResponse(user);
    }
    async register(registerDto) {
        const { email, password, userType, ...userData } = registerDto;
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userType,
            role: this.getUserRoleFromType(userType),
            emailVerified: false,
        });
        const savedUser = await this.userRepository.save(user);
        await this.createUserTypeRecord(savedUser, userType, userData);
        await this.claimsService.assignDefaultClaims(savedUser);
        const userWithClaims = await this.userRepository.findOne({
            where: { id: savedUser.id },
            relations: ['claims', 'claims.claim'],
        });
        return this.generateAuthResponse(userWithClaims);
    }
    async loginParentAsStudent(parent, studentId) {
        const parentRecord = await this.parentRepository.findOne({
            where: { user: { id: parent.id } },
            relations: ['children', 'children.user', 'children.user.claims', 'children.user.claims.claim'],
        });
        const student = parentRecord?.children.find(child => child.id === studentId);
        if (!student) {
            throw new common_1.UnauthorizedException('You are not authorized to access this student account');
        }
        const studentUser = student.user;
        const parentClaims = parent.claims.map(uc => uc.claim.name);
        const studentClaims = studentUser.claims.map(uc => uc.claim.name);
        const combinedClaims = [...new Set([...parentClaims, ...studentClaims])];
        const combinedRoutes = [...new Set([
                ...parent.getFrontendRoutes(),
                ...studentUser.getFrontendRoutes(),
            ])];
        const payload = {
            sub: parent.id,
            email: parent.email,
            userType: user_entity_1.UserType.PARENT,
            role: user_entity_1.UserRole.PARENT,
            claims: combinedClaims,
            frontendRoutes: combinedRoutes,
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: {
                id: parent.id,
                email: parent.email,
                firstName: parent.firstName,
                lastName: parent.lastName,
                userType: user_entity_1.UserType.PARENT,
                role: user_entity_1.UserRole.PARENT,
                claims: combinedClaims,
                frontendRoutes: combinedRoutes,
                canManageStudents: parentRecord.children.map(child => child.id),
            },
        };
    }
    async generateAuthResponse(user) {
        const claims = user.claims
            .filter(uc => uc.isValid)
            .map(uc => uc.claim.name);
        const frontendRoutes = user.getFrontendRoutes();
        const payload = {
            sub: user.id,
            email: user.email,
            userType: user.userType,
            role: user.role,
            claims,
            frontendRoutes,
        };
        const token = this.jwtService.sign(payload);
        const response = {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType,
                role: user.role,
                claims,
                frontendRoutes,
            },
        };
        if (user.userType === user_entity_1.UserType.PARENT && user.parent) {
            const parentWithChildren = await this.parentRepository.findOne({
                where: { id: user.parent.id },
                relations: ['children'],
            });
            response.user.canManageStudents = parentWithChildren?.children.map(child => child.id) || [];
        }
        return response;
    }
    getUserRoleFromType(userType) {
        switch (userType) {
            case user_entity_1.UserType.STAFF:
                return user_entity_1.UserRole.INSTRUCTOR;
            case user_entity_1.UserType.PARENT:
                return user_entity_1.UserRole.PARENT;
            case user_entity_1.UserType.STUDENT:
                return user_entity_1.UserRole.STUDENT;
            default:
                return user_entity_1.UserRole.STUDENT;
        }
    }
    async createUserTypeRecord(user, userType, userData) {
        switch (userType) {
            case user_entity_1.UserType.STUDENT:
                const student = this.studentRepository.create({
                    user,
                    studentId: userData.studentId || `STU${Date.now()}`,
                    dateOfBirth: userData.dateOfBirth,
                    grade: userData.grade,
                    canLoginDirectly: userData.canLoginDirectly || false,
                });
                await this.studentRepository.save(student);
                break;
            case user_entity_1.UserType.STAFF:
                const staff = this.staffRepository.create({
                    user,
                    employeeId: userData.employeeId || `EMP${Date.now()}`,
                    staffType: userData.staffType,
                    department: userData.department,
                    position: userData.position,
                });
                await this.staffRepository.save(staff);
                break;
            case user_entity_1.UserType.PARENT:
                const parent = this.parentRepository.create({
                    user,
                    phone: userData.phone,
                    relationship: userData.relationship,
                });
                await this.parentRepository.save(parent);
                break;
        }
    }
    async getUserById(id) {
        return this.userRepository.findOne({
            where: { id, isActive: true },
            relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(3, (0, typeorm_1.InjectRepository)(parent_entity_1.Parent)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _e : Object, typeof (_f = typeof claims_service_1.ClaimsService !== "undefined" && claims_service_1.ClaimsService) === "function" ? _f : Object])
], AuthService);


/***/ }),

/***/ "./src/auth/decorators/claims.decorator.ts":
/*!*************************************************!*\
  !*** ./src/auth/decorators/claims.decorator.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequireAllClaims = exports.RequireClaims = exports.CLAIMS_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CLAIMS_KEY = 'claims';
const RequireClaims = (...claims) => (0, common_1.SetMetadata)(exports.CLAIMS_KEY, claims);
exports.RequireClaims = RequireClaims;
const RequireAllClaims = (...claims) => (0, common_1.SetMetadata)(exports.CLAIMS_KEY, claims);
exports.RequireAllClaims = RequireAllClaims;


/***/ }),

/***/ "./src/auth/dto/login.dto.ts":
/*!***********************************!*\
  !*** ./src/auth/dto/login.dto.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'User email address',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password123',
        description: 'User password',
        minLength: 6,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'uuid-of-student',
        description: 'Student ID for parent login (when parent wants to access student account)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LoginDto.prototype, "loginAsStudent", void 0);


/***/ }),

/***/ "./src/auth/dto/register.dto.ts":
/*!**************************************!*\
  !*** ./src/auth/dto/register.dto.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const user_entity_1 = __webpack_require__(/*! ../../users/entities/user.entity */ "./src/users/entities/user.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ../../users/entities/staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ../../users/entities/parent.entity */ "./src/users/entities/parent.entity.ts");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'User email address',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password123',
        description: 'User password',
        minLength: 6,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: 'First name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Doe',
        description: 'Last name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: user_entity_1.UserType,
        example: user_entity_1.UserType.STUDENT,
        description: 'Type of user',
    }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserType),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserType !== "undefined" && user_entity_1.UserType) === "function" ? _a : Object)
], RegisterDto.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'STU001',
        description: 'Student ID (required for students)',
    }),
    (0, class_validator_1.ValidateIf)(o => o.userType === user_entity_1.UserType.STUDENT),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2010-01-01',
        description: 'Date of birth (for students)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Grade 5',
        description: 'Current grade (for students)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        description: 'Whether student can login directly without parent',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegisterDto.prototype, "canLoginDirectly", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'EMP001',
        description: 'Employee ID (required for staff)',
    }),
    (0, class_validator_1.ValidateIf)(o => o.userType === user_entity_1.UserType.STAFF),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: staff_entity_1.StaffType,
        example: staff_entity_1.StaffType.INSTRUCTOR,
        description: 'Type of staff (required for staff)',
    }),
    (0, class_validator_1.ValidateIf)(o => o.userType === user_entity_1.UserType.STAFF),
    (0, class_validator_1.IsEnum)(staff_entity_1.StaffType),
    __metadata("design:type", typeof (_b = typeof staff_entity_1.StaffType !== "undefined" && staff_entity_1.StaffType) === "function" ? _b : Object)
], RegisterDto.prototype, "staffType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Mathematics',
        description: 'Department (for staff)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Senior Teacher',
        description: 'Position (for staff)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+1234567890',
        description: 'Phone number (for parents)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: parent_entity_1.ParentRelationship,
        example: parent_entity_1.ParentRelationship.FATHER,
        description: 'Relationship to student (for parents)',
    }),
    (0, class_validator_1.ValidateIf)(o => o.userType === user_entity_1.UserType.PARENT),
    (0, class_validator_1.IsEnum)(parent_entity_1.ParentRelationship),
    __metadata("design:type", typeof (_c = typeof parent_entity_1.ParentRelationship !== "undefined" && parent_entity_1.ParentRelationship) === "function" ? _c : Object)
], RegisterDto.prototype, "relationship", void 0);


/***/ }),

/***/ "./src/auth/guards/claims.guard.ts":
/*!*****************************************!*\
  !*** ./src/auth/guards/claims.guard.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequireAllClaimsGuard = exports.ClaimsGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const claims_decorator_1 = __webpack_require__(/*! ../decorators/claims.decorator */ "./src/auth/decorators/claims.decorator.ts");
let ClaimsGuard = class ClaimsGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredClaims = this.reflector.getAllAndOverride(claims_decorator_1.CLAIMS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredClaims || requiredClaims.length === 0) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.claims) {
            return false;
        }
        return requiredClaims.some(claim => user.claims.includes(claim));
    }
};
exports.ClaimsGuard = ClaimsGuard;
exports.ClaimsGuard = ClaimsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], ClaimsGuard);
let RequireAllClaimsGuard = class RequireAllClaimsGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredClaims = this.reflector.getAllAndOverride(claims_decorator_1.CLAIMS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredClaims || requiredClaims.length === 0) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.claims) {
            return false;
        }
        return requiredClaims.every(claim => user.claims.includes(claim));
    }
};
exports.RequireAllClaimsGuard = RequireAllClaimsGuard;
exports.RequireAllClaimsGuard = RequireAllClaimsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], RequireAllClaimsGuard);


/***/ }),

/***/ "./src/auth/guards/jwt-auth.guard.ts":
/*!*******************************************!*\
  !*** ./src/auth/guards/jwt-auth.guard.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),

/***/ "./src/auth/strategies/jwt.strategy.ts":
/*!*********************************************!*\
  !*** ./src/auth/strategies/jwt.strategy.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./src/auth/auth.service.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
        });
        this.authService = authService;
    }
    async validate(payload) {
        const user = await this.authService.getUserById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('User account is deactivated');
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: payload.userType,
            role: payload.role,
            claims: payload.claims,
            frontendRoutes: payload.frontendRoutes,
            user: user,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),

/***/ "./src/claims/claims.controller.ts":
/*!*****************************************!*\
  !*** ./src/claims/claims.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClaimsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const claims_service_1 = __webpack_require__(/*! ./claims.service */ "./src/claims/claims.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/auth/guards/jwt-auth.guard.ts");
const claims_guard_1 = __webpack_require__(/*! ../auth/guards/claims.guard */ "./src/auth/guards/claims.guard.ts");
const claims_decorator_1 = __webpack_require__(/*! ../auth/decorators/claims.decorator */ "./src/auth/decorators/claims.decorator.ts");
const claim_entity_1 = __webpack_require__(/*! ./entities/claim.entity */ "./src/claims/entities/claim.entity.ts");
let ClaimsController = class ClaimsController {
    constructor(claimsService) {
        this.claimsService = claimsService;
    }
    async getAllClaims() {
        return this.claimsService.getAllClaims();
    }
    async getClaimsByCategory(category) {
        return this.claimsService.getClaimsByCategory(category);
    }
    async getUserClaims(userId) {
        return this.claimsService.getUserClaims(userId);
    }
    async grantClaim(grantClaimDto) {
        return this.claimsService.grantClaim(grantClaimDto.userId, grantClaimDto.claimName, grantClaimDto.grantedBy, grantClaimDto.context);
    }
    async revokeClaim(revokeClaimDto) {
        await this.claimsService.revokeClaim(revokeClaimDto.userId, revokeClaimDto.claimName);
        return { message: 'Claim revoked successfully' };
    }
    async initializeDefaultClaims() {
        await this.claimsService.initializeDefaultClaims();
        return { message: 'Default claims initialized successfully' };
    }
};
exports.ClaimsController = ClaimsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('system.admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all claims' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claims retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getAllClaims", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('system.admin', 'users.view_all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get claims by category' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claims retrieved successfully' }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof claim_entity_1.ClaimCategory !== "undefined" && claim_entity_1.ClaimCategory) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getClaimsByCategory", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('system.admin', 'users.view_all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user claims' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User claims retrieved successfully' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getUserClaims", null);
__decorate([
    (0, common_1.Post)('grant'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('system.admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Grant claim to user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Claim granted successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "grantClaim", null);
__decorate([
    (0, common_1.Delete)('revoke'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('system.admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke claim from user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claim revoked successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "revokeClaim", null);
__decorate([
    (0, common_1.Post)('initialize'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('system.admin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Initialize default claims',
        description: 'Initialize the system with default claims (run once during setup)'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Default claims initialized successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "initializeDefaultClaims", null);
exports.ClaimsController = ClaimsController = __decorate([
    (0, swagger_1.ApiTags)('Claims Management'),
    (0, common_1.Controller)('claims'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof claims_service_1.ClaimsService !== "undefined" && claims_service_1.ClaimsService) === "function" ? _a : Object])
], ClaimsController);


/***/ }),

/***/ "./src/claims/claims.module.ts":
/*!*************************************!*\
  !*** ./src/claims/claims.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClaimsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const claims_service_1 = __webpack_require__(/*! ./claims.service */ "./src/claims/claims.service.ts");
const claims_controller_1 = __webpack_require__(/*! ./claims.controller */ "./src/claims/claims.controller.ts");
const claim_entity_1 = __webpack_require__(/*! ./entities/claim.entity */ "./src/claims/entities/claim.entity.ts");
const user_claim_entity_1 = __webpack_require__(/*! ./entities/user-claim.entity */ "./src/claims/entities/user-claim.entity.ts");
let ClaimsModule = class ClaimsModule {
};
exports.ClaimsModule = ClaimsModule;
exports.ClaimsModule = ClaimsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([claim_entity_1.Claim, user_claim_entity_1.UserClaim])],
        controllers: [claims_controller_1.ClaimsController],
        providers: [claims_service_1.ClaimsService],
        exports: [claims_service_1.ClaimsService],
    })
], ClaimsModule);


/***/ }),

/***/ "./src/claims/claims.service.ts":
/*!**************************************!*\
  !*** ./src/claims/claims.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClaimsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const claim_entity_1 = __webpack_require__(/*! ./entities/claim.entity */ "./src/claims/entities/claim.entity.ts");
const user_claim_entity_1 = __webpack_require__(/*! ./entities/user-claim.entity */ "./src/claims/entities/user-claim.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../users/entities/user.entity */ "./src/users/entities/user.entity.ts");
let ClaimsService = class ClaimsService {
    constructor(claimRepository, userClaimRepository) {
        this.claimRepository = claimRepository;
        this.userClaimRepository = userClaimRepository;
    }
    async initializeDefaultClaims() {
        const defaultClaims = this.getDefaultClaimsDefinition();
        for (const claimData of defaultClaims) {
            const existingClaim = await this.claimRepository.findOne({
                where: { name: claimData.name },
            });
            if (!existingClaim) {
                const claim = this.claimRepository.create(claimData);
                await this.claimRepository.save(claim);
            }
        }
    }
    async assignDefaultClaims(user) {
        const defaultClaimNames = this.getDefaultClaimsForUserType(user.userType, user.role);
        for (const claimName of defaultClaimNames) {
            const claim = await this.claimRepository.findOne({
                where: { name: claimName },
            });
            if (claim) {
                const existingUserClaim = await this.userClaimRepository.findOne({
                    where: { userId: user.id, claimId: claim.id },
                });
                if (!existingUserClaim) {
                    const userClaim = this.userClaimRepository.create({
                        userId: user.id,
                        claimId: claim.id,
                        grantedBy: 'system',
                        isActive: true,
                    });
                    await this.userClaimRepository.save(userClaim);
                }
            }
        }
    }
    async grantClaim(userId, claimName, grantedBy, context) {
        const claim = await this.claimRepository.findOne({
            where: { name: claimName },
        });
        if (!claim) {
            throw new common_1.NotFoundException(`Claim '${claimName}' not found`);
        }
        const existingUserClaim = await this.userClaimRepository.findOne({
            where: { userId, claimId: claim.id },
        });
        if (existingUserClaim) {
            existingUserClaim.isActive = true;
            existingUserClaim.grantedBy = grantedBy;
            existingUserClaim.context = context;
            return this.userClaimRepository.save(existingUserClaim);
        }
        const userClaim = this.userClaimRepository.create({
            userId,
            claimId: claim.id,
            grantedBy,
            context,
            isActive: true,
        });
        return this.userClaimRepository.save(userClaim);
    }
    async revokeClaim(userId, claimName) {
        const claim = await this.claimRepository.findOne({
            where: { name: claimName },
        });
        if (!claim) {
            throw new common_1.NotFoundException(`Claim '${claimName}' not found`);
        }
        await this.userClaimRepository.update({ userId, claimId: claim.id }, { isActive: false });
    }
    async getUserClaims(userId) {
        return this.userClaimRepository.find({
            where: { userId, isActive: true },
            relations: ['claim'],
        });
    }
    async getUserClaimsByCategory(userId, category) {
        return this.userClaimRepository.find({
            where: {
                userId,
                isActive: true,
                claim: { category }
            },
            relations: ['claim'],
        });
    }
    async getAllClaims() {
        return this.claimRepository.find({
            where: { isActive: true },
            order: { category: 'ASC', priority: 'ASC' },
        });
    }
    async getClaimsByCategory(category) {
        return this.claimRepository.find({
            where: { category, isActive: true },
            order: { priority: 'ASC' },
        });
    }
    getDefaultClaimsDefinition() {
        return [
            {
                name: 'users.view_all',
                displayName: 'View All Users',
                description: 'Can view all users in the system',
                category: claim_entity_1.ClaimCategory.USERS,
                action: claim_entity_1.ClaimAction.VIEW_ALL,
                frontendRoute: '/admin/users',
                priority: 1,
            },
            {
                name: 'users.create',
                displayName: 'Create Users',
                description: 'Can create new users',
                category: claim_entity_1.ClaimCategory.USERS,
                action: claim_entity_1.ClaimAction.CREATE,
                frontendRoute: '/admin/users/create',
                priority: 2,
            },
            {
                name: 'users.update',
                displayName: 'Update Users',
                description: 'Can update user information',
                category: claim_entity_1.ClaimCategory.USERS,
                action: claim_entity_1.ClaimAction.UPDATE,
                priority: 3,
            },
            {
                name: 'users.delete',
                displayName: 'Delete Users',
                description: 'Can delete users',
                category: claim_entity_1.ClaimCategory.USERS,
                action: claim_entity_1.ClaimAction.DELETE,
                priority: 4,
            },
            {
                name: 'students.view_all',
                displayName: 'View All Students',
                description: 'Can view all students',
                category: claim_entity_1.ClaimCategory.STUDENTS,
                action: claim_entity_1.ClaimAction.VIEW_ALL,
                frontendRoute: '/students',
                priority: 1,
            },
            {
                name: 'students.view_own',
                displayName: 'View Own Student Profile',
                description: 'Can view own student profile',
                category: claim_entity_1.ClaimCategory.STUDENTS,
                action: claim_entity_1.ClaimAction.VIEW_OWN,
                frontendRoute: '/student/profile',
                priority: 2,
            },
            {
                name: 'students.create',
                displayName: 'Create Students',
                description: 'Can create new student records',
                category: claim_entity_1.ClaimCategory.STUDENTS,
                action: claim_entity_1.ClaimAction.CREATE,
                frontendRoute: '/admin/students/create',
                priority: 3,
            },
            {
                name: 'students.update',
                displayName: 'Update Students',
                description: 'Can update student information',
                category: claim_entity_1.ClaimCategory.STUDENTS,
                action: claim_entity_1.ClaimAction.UPDATE,
                priority: 4,
            },
            {
                name: 'courses.view_all',
                displayName: 'View All Courses',
                description: 'Can view all courses',
                category: claim_entity_1.ClaimCategory.COURSES,
                action: claim_entity_1.ClaimAction.VIEW_ALL,
                frontendRoute: '/courses',
                priority: 1,
            },
            {
                name: 'courses.create',
                displayName: 'Create Courses',
                description: 'Can create new courses',
                category: claim_entity_1.ClaimCategory.COURSES,
                action: claim_entity_1.ClaimAction.CREATE,
                frontendRoute: '/instructor/courses/create',
                priority: 2,
            },
            {
                name: 'courses.update',
                displayName: 'Update Courses',
                description: 'Can update course information',
                category: claim_entity_1.ClaimCategory.COURSES,
                action: claim_entity_1.ClaimAction.UPDATE,
                priority: 3,
            },
            {
                name: 'courses.delete',
                displayName: 'Delete Courses',
                description: 'Can delete courses',
                category: claim_entity_1.ClaimCategory.COURSES,
                action: claim_entity_1.ClaimAction.DELETE,
                priority: 4,
            },
            {
                name: 'assessments.view_all',
                displayName: 'View All Assessments',
                description: 'Can view all assessments',
                category: claim_entity_1.ClaimCategory.ASSESSMENTS,
                action: claim_entity_1.ClaimAction.VIEW_ALL,
                frontendRoute: '/assessments',
                priority: 1,
            },
            {
                name: 'assessments.view_own',
                displayName: 'View Own Assessments',
                description: 'Can view own assessments',
                category: claim_entity_1.ClaimCategory.ASSESSMENTS,
                action: claim_entity_1.ClaimAction.VIEW_OWN,
                frontendRoute: '/student/assessments',
                priority: 2,
            },
            {
                name: 'assessments.create',
                displayName: 'Create Assessments',
                description: 'Can create new assessments',
                category: claim_entity_1.ClaimCategory.ASSESSMENTS,
                action: claim_entity_1.ClaimAction.CREATE,
                frontendRoute: '/instructor/assessments/create',
                priority: 3,
            },
            {
                name: 'assessments.grade',
                displayName: 'Grade Assessments',
                description: 'Can grade student assessments',
                category: claim_entity_1.ClaimCategory.ASSESSMENTS,
                action: claim_entity_1.ClaimAction.UPDATE,
                frontendRoute: '/instructor/grading',
                priority: 4,
            },
            {
                name: 'reports.view_all',
                displayName: 'View All Reports',
                description: 'Can view all system reports',
                category: claim_entity_1.ClaimCategory.REPORTS,
                action: claim_entity_1.ClaimAction.VIEW_ALL,
                frontendRoute: '/admin/reports',
                priority: 1,
            },
            {
                name: 'reports.student_progress',
                displayName: 'View Student Progress Reports',
                description: 'Can view student progress reports',
                category: claim_entity_1.ClaimCategory.REPORTS,
                action: claim_entity_1.ClaimAction.READ,
                frontendRoute: '/reports/student-progress',
                priority: 2,
            },
            {
                name: 'system.admin',
                displayName: 'System Administration',
                description: 'Full system administration access',
                category: claim_entity_1.ClaimCategory.SYSTEM,
                action: claim_entity_1.ClaimAction.MANAGE,
                frontendRoute: '/admin/system',
                priority: 1,
            },
            {
                name: 'system.settings',
                displayName: 'System Settings',
                description: 'Can modify system settings',
                category: claim_entity_1.ClaimCategory.SYSTEM,
                action: claim_entity_1.ClaimAction.UPDATE,
                frontendRoute: '/admin/settings',
                priority: 2,
            },
            {
                name: 'communication.send_messages',
                displayName: 'Send Messages',
                description: 'Can send messages to other users',
                category: claim_entity_1.ClaimCategory.COMMUNICATION,
                action: claim_entity_1.ClaimAction.CREATE,
                frontendRoute: '/messages/compose',
                priority: 1,
            },
            {
                name: 'communication.view_messages',
                displayName: 'View Messages',
                description: 'Can view received messages',
                category: claim_entity_1.ClaimCategory.COMMUNICATION,
                action: claim_entity_1.ClaimAction.READ,
                frontendRoute: '/messages',
                priority: 2,
            },
        ];
    }
    getDefaultClaimsForUserType(userType, role) {
        const baseClaims = [
            'communication.view_messages',
            'communication.send_messages',
        ];
        switch (userType) {
            case user_entity_1.UserType.STUDENT:
                return [
                    ...baseClaims,
                    'students.view_own',
                    'assessments.view_own',
                    'courses.view_all',
                ];
            case user_entity_1.UserType.PARENT:
                return [
                    ...baseClaims,
                    'students.view_own',
                    'assessments.view_own',
                    'courses.view_all',
                    'reports.student_progress',
                ];
            case user_entity_1.UserType.STAFF:
                if (role === user_entity_1.UserRole.ADMIN) {
                    return [
                        ...baseClaims,
                        'users.view_all',
                        'users.create',
                        'users.update',
                        'users.delete',
                        'students.view_all',
                        'students.create',
                        'students.update',
                        'courses.view_all',
                        'courses.create',
                        'courses.update',
                        'courses.delete',
                        'assessments.view_all',
                        'assessments.create',
                        'assessments.grade',
                        'reports.view_all',
                        'reports.student_progress',
                        'system.admin',
                        'system.settings',
                    ];
                }
                else if (role === user_entity_1.UserRole.INSTRUCTOR) {
                    return [
                        ...baseClaims,
                        'students.view_all',
                        'courses.view_all',
                        'courses.create',
                        'courses.update',
                        'assessments.view_all',
                        'assessments.create',
                        'assessments.grade',
                        'reports.student_progress',
                    ];
                }
                break;
        }
        return baseClaims;
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(claim_entity_1.Claim)),
    __param(1, (0, typeorm_1.InjectRepository)(user_claim_entity_1.UserClaim)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ClaimsService);


/***/ }),

/***/ "./src/claims/entities/claim.entity.ts":
/*!*********************************************!*\
  !*** ./src/claims/entities/claim.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Claim = exports.ClaimAction = exports.ClaimCategory = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_claim_entity_1 = __webpack_require__(/*! ./user-claim.entity */ "./src/claims/entities/user-claim.entity.ts");
var ClaimCategory;
(function (ClaimCategory) {
    ClaimCategory["USERS"] = "users";
    ClaimCategory["STUDENTS"] = "students";
    ClaimCategory["COURSES"] = "courses";
    ClaimCategory["ASSESSMENTS"] = "assessments";
    ClaimCategory["REPORTS"] = "reports";
    ClaimCategory["SYSTEM"] = "system";
    ClaimCategory["COMMUNICATION"] = "communication";
})(ClaimCategory || (exports.ClaimCategory = ClaimCategory = {}));
var ClaimAction;
(function (ClaimAction) {
    ClaimAction["CREATE"] = "create";
    ClaimAction["READ"] = "read";
    ClaimAction["UPDATE"] = "update";
    ClaimAction["DELETE"] = "delete";
    ClaimAction["MANAGE"] = "manage";
    ClaimAction["VIEW_ALL"] = "view_all";
    ClaimAction["VIEW_OWN"] = "view_own";
    ClaimAction["APPROVE"] = "approve";
    ClaimAction["REJECT"] = "reject";
})(ClaimAction || (exports.ClaimAction = ClaimAction = {}));
let Claim = class Claim {
    get fullName() {
        return `${this.category}.${this.action}`;
    }
    static createClaimName(category, action, resource) {
        return resource ? `${category}.${resource}.${action}` : `${category}.${action}`;
    }
};
exports.Claim = Claim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Claim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Claim.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Claim.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ClaimCategory,
    }),
    __metadata("design:type", String)
], Claim.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ClaimAction,
    }),
    __metadata("design:type", String)
], Claim.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "frontendRoute", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Claim.prototype, "frontendComponent", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Claim.prototype, "requiredParams", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Claim.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Claim.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Claim.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Claim.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_claim_entity_1.UserClaim, (userClaim) => userClaim.claim),
    __metadata("design:type", Array)
], Claim.prototype, "userClaims", void 0);
exports.Claim = Claim = __decorate([
    (0, typeorm_1.Entity)('claims')
], Claim);


/***/ }),

/***/ "./src/claims/entities/user-claim.entity.ts":
/*!**************************************************!*\
  !*** ./src/claims/entities/user-claim.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserClaim = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../../users/entities/user.entity */ "./src/users/entities/user.entity.ts");
const claim_entity_1 = __webpack_require__(/*! ./claim.entity */ "./src/claims/entities/claim.entity.ts");
let UserClaim = class UserClaim {
    get isExpired() {
        return this.expiresAt ? new Date() > this.expiresAt : false;
    }
    get isValid() {
        return this.isActive && !this.isExpired;
    }
};
exports.UserClaim = UserClaim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserClaim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.claims, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], UserClaim.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserClaim.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (claim) => claim.userClaims, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'claimId' }),
    __metadata("design:type", typeof (_b = typeof claim_entity_1.Claim !== "undefined" && claim_entity_1.Claim) === "function" ? _b : Object)
], UserClaim.prototype, "claim", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserClaim.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserClaim.prototype, "grantedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserClaim.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json', { nullable: true }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], UserClaim.prototype, "parameters", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserClaim.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], UserClaim.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], UserClaim.prototype, "grantedAt", void 0);
exports.UserClaim = UserClaim = __decorate([
    (0, typeorm_1.Entity)('user_claims'),
    (0, typeorm_1.Unique)(['user', 'claim'])
], UserClaim);


/***/ }),

/***/ "./src/database/database.module.ts":
/*!*****************************************!*\
  !*** ./src/database/database.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const user_entity_1 = __webpack_require__(/*! ../users/entities/user.entity */ "./src/users/entities/user.entity.ts");
const student_entity_1 = __webpack_require__(/*! ../users/entities/student.entity */ "./src/users/entities/student.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ../users/entities/staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ../users/entities/parent.entity */ "./src/users/entities/parent.entity.ts");
const claim_entity_1 = __webpack_require__(/*! ../claims/entities/claim.entity */ "./src/claims/entities/claim.entity.ts");
const user_claim_entity_1 = __webpack_require__(/*! ../claims/entities/user-claim.entity */ "./src/claims/entities/user-claim.entity.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'password'),
                    database: configService.get('DB_NAME', 'school_management'),
                    entities: [user_entity_1.User, student_entity_1.Student, staff_entity_1.Staff, parent_entity_1.Parent, claim_entity_1.Claim, user_claim_entity_1.UserClaim],
                    synchronize: configService.get('NODE_ENV') !== 'production',
                    logging: configService.get('NODE_ENV') === 'development',
                    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);


/***/ }),

/***/ "./src/health/health.controller.ts":
/*!*****************************************!*\
  !*** ./src/health/health.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let HealthController = class HealthController {
    check() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health')
], HealthController);


/***/ }),

/***/ "./src/users/entities/parent.entity.ts":
/*!*********************************************!*\
  !*** ./src/users/entities/parent.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parent = exports.ParentRelationship = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/users/entities/user.entity.ts");
const student_entity_1 = __webpack_require__(/*! ./student.entity */ "./src/users/entities/student.entity.ts");
var ParentRelationship;
(function (ParentRelationship) {
    ParentRelationship["FATHER"] = "father";
    ParentRelationship["MOTHER"] = "mother";
    ParentRelationship["GUARDIAN"] = "guardian";
    ParentRelationship["STEPFATHER"] = "stepfather";
    ParentRelationship["STEPMOTHER"] = "stepmother";
    ParentRelationship["GRANDPARENT"] = "grandparent";
    ParentRelationship["OTHER"] = "other";
})(ParentRelationship || (exports.ParentRelationship = ParentRelationship = {}));
let Parent = class Parent {
    get displayName() {
        return `${this.user?.fullName} (${this.relationship})`;
    }
    get childrenCount() {
        return this.children?.length || 0;
    }
};
exports.Parent = Parent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Parent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parent.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parent.prototype, "workPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parent.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parent.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Parent.prototype, "workplace", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ParentRelationship,
        default: ParentRelationship.GUARDIAN,
    }),
    __metadata("design:type", String)
], Parent.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Parent.prototype, "isPrimaryContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Parent.prototype, "canPickupStudent", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Parent.prototype, "receiveNotifications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Parent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Parent.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.parent),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Parent.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.Student, (student) => student.parents),
    (0, typeorm_1.JoinTable)({
        name: 'parent_student',
        joinColumn: {
            name: 'parentId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'studentId',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Parent.prototype, "children", void 0);
exports.Parent = Parent = __decorate([
    (0, typeorm_1.Entity)('parents')
], Parent);


/***/ }),

/***/ "./src/users/entities/staff.entity.ts":
/*!********************************************!*\
  !*** ./src/users/entities/staff.entity.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Staff = exports.EmploymentStatus = exports.StaffType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/users/entities/user.entity.ts");
var StaffType;
(function (StaffType) {
    StaffType["ADMIN"] = "admin";
    StaffType["INSTRUCTOR"] = "instructor";
    StaffType["COUNSELOR"] = "counselor";
    StaffType["LIBRARIAN"] = "librarian";
    StaffType["NURSE"] = "nurse";
    StaffType["SECURITY"] = "security";
    StaffType["MAINTENANCE"] = "maintenance";
    StaffType["OTHER"] = "other";
})(StaffType || (exports.StaffType = StaffType = {}));
var EmploymentStatus;
(function (EmploymentStatus) {
    EmploymentStatus["FULL_TIME"] = "full_time";
    EmploymentStatus["PART_TIME"] = "part_time";
    EmploymentStatus["CONTRACT"] = "contract";
    EmploymentStatus["SUBSTITUTE"] = "substitute";
    EmploymentStatus["INTERN"] = "intern";
})(EmploymentStatus || (exports.EmploymentStatus = EmploymentStatus = {}));
let Staff = class Staff {
    get displayName() {
        return `${this.user?.fullName} (${this.employeeId})`;
    }
    get isInstructor() {
        return this.staffType === StaffType.INSTRUCTOR;
    }
    get isAdmin() {
        return this.staffType === StaffType.ADMIN;
    }
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Staff.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StaffType,
    }),
    __metadata("design:type", String)
], Staff.prototype, "staffType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EmploymentStatus,
        default: EmploymentStatus.FULL_TIME,
    }),
    __metadata("design:type", String)
], Staff.prototype, "employmentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Staff.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "officeLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "officeHours", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Staff.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "emergencyContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "emergencyPhone", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Staff.prototype, "qualifications", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Staff.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Staff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Staff.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.staff),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], Staff.prototype, "user", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)('staff')
], Staff);


/***/ }),

/***/ "./src/users/entities/student.entity.ts":
/*!**********************************************!*\
  !*** ./src/users/entities/student.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Student = exports.StudentStatus = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./src/users/entities/user.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ./parent.entity */ "./src/users/entities/parent.entity.ts");
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["ACTIVE"] = "active";
    StudentStatus["INACTIVE"] = "inactive";
    StudentStatus["GRADUATED"] = "graduated";
    StudentStatus["TRANSFERRED"] = "transferred";
    StudentStatus["SUSPENDED"] = "suspended";
})(StudentStatus || (exports.StudentStatus = StudentStatus = {}));
let Student = class Student {
    get isActive() {
        return this.status === StudentStatus.ACTIVE;
    }
    get displayName() {
        return `${this.user?.fullName} (${this.studentId})`;
    }
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Student.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StudentStatus,
        default: StudentStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Student.prototype, "enrollmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "emergencyContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "emergencyPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "canLoginDirectly", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Student.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Student.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.student),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_e = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _e : Object)
], Student.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => parent_entity_1.Parent, (parent) => parent.children),
    __metadata("design:type", Array)
], Student.prototype, "parents", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('students')
], Student);


/***/ }),

/***/ "./src/users/entities/user.entity.ts":
/*!*******************************************!*\
  !*** ./src/users/entities/user.entity.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.UserRole = exports.UserType = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const user_claim_entity_1 = __webpack_require__(/*! ../../claims/entities/user-claim.entity */ "./src/claims/entities/user-claim.entity.ts");
const student_entity_1 = __webpack_require__(/*! ./student.entity */ "./src/users/entities/student.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ./staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ./parent.entity */ "./src/users/entities/parent.entity.ts");
var UserType;
(function (UserType) {
    UserType["STAFF"] = "staff";
    UserType["PARENT"] = "parent";
    UserType["STUDENT"] = "student";
})(UserType || (exports.UserType = UserType = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["INSTRUCTOR"] = "instructor";
    UserRole["PARENT"] = "parent";
    UserRole["STUDENT"] = "student";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    hasClaim(claimName) {
        return this.claims.some(claim => claim.claim.name === claimName);
    }
    hasAnyClaim(claimNames) {
        return claimNames.some(claimName => this.hasClaim(claimName));
    }
    hasAllClaims(claimNames) {
        return claimNames.every(claimName => this.hasClaim(claimName));
    }
    getClaimsByCategory(category) {
        return this.claims.filter(userClaim => userClaim.claim.category === category);
    }
    getFrontendRoutes() {
        return this.claims
            .map(userClaim => userClaim.claim.frontendRoute)
            .filter(route => route !== null && route !== undefined);
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserType,
    }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_claim_entity_1.UserClaim, (userClaim) => userClaim.user, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "claims", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => student_entity_1.Student, (student) => student.user, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", typeof (_d = typeof student_entity_1.Student !== "undefined" && student_entity_1.Student) === "function" ? _d : Object)
], User.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => staff_entity_1.Staff, (staff) => staff.user, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", typeof (_e = typeof staff_entity_1.Staff !== "undefined" && staff_entity_1.Staff) === "function" ? _e : Object)
], User.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => parent_entity_1.Parent, (parent) => parent.user, {
        nullable: true,
        cascade: true,
    }),
    __metadata("design:type", typeof (_f = typeof parent_entity_1.Parent !== "undefined" && parent_entity_1.Parent) === "function" ? _f : Object)
], User.prototype, "parent", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),

/***/ "./src/users/users.controller.ts":
/*!***************************************!*\
  !*** ./src/users/users.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/users/users.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./src/auth/guards/jwt-auth.guard.ts");
const claims_guard_1 = __webpack_require__(/*! ../auth/guards/claims.guard */ "./src/auth/guards/claims.guard.ts");
const claims_decorator_1 = __webpack_require__(/*! ../auth/decorators/claims.decorator */ "./src/auth/decorators/claims.decorator.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async findStudents() {
        return this.usersService.findStudents();
    }
    async findStaff() {
        return this.usersService.findStaff();
    }
    async findParents() {
        return this.usersService.findParents();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('users.view_all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('users.view_all', 'students.view_own'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('students/all'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('students.view_all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all students' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Students retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findStudents", null);
__decorate([
    (0, common_1.Get)('staff/all'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('users.view_all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all staff' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Staff retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findStaff", null);
__decorate([
    (0, common_1.Get)('parents/all'),
    (0, common_1.UseGuards)(claims_guard_1.ClaimsGuard),
    (0, claims_decorator_1.RequireClaims)('users.view_all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all parents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Parents retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findParents", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./src/users/users.module.ts":
/*!***********************************!*\
  !*** ./src/users/users.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/users/users.service.ts");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./src/users/users.controller.ts");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./src/users/entities/user.entity.ts");
const student_entity_1 = __webpack_require__(/*! ./entities/student.entity */ "./src/users/entities/student.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ./entities/staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ./entities/parent.entity */ "./src/users/entities/parent.entity.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, student_entity_1.Student, staff_entity_1.Staff, parent_entity_1.Parent])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./src/users/users.service.ts":
/*!************************************!*\
  !*** ./src/users/users.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./src/users/entities/user.entity.ts");
const student_entity_1 = __webpack_require__(/*! ./entities/student.entity */ "./src/users/entities/student.entity.ts");
const staff_entity_1 = __webpack_require__(/*! ./entities/staff.entity */ "./src/users/entities/staff.entity.ts");
const parent_entity_1 = __webpack_require__(/*! ./entities/parent.entity */ "./src/users/entities/parent.entity.ts");
let UsersService = class UsersService {
    constructor(userRepository, studentRepository, staffRepository, parentRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.staffRepository = staffRepository;
        this.parentRepository = parentRepository;
    }
    async findAll() {
        return this.userRepository.find({
            relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
        });
    }
    async findOne(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
        });
    }
    async findStudents() {
        return this.studentRepository.find({
            relations: ['user', 'parents'],
        });
    }
    async findStaff() {
        return this.staffRepository.find({
            relations: ['user'],
        });
    }
    async findParents() {
        return this.parentRepository.find({
            relations: ['user', 'children'],
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(3, (0, typeorm_1.InjectRepository)(parent_entity_1.Parent)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], UsersService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:4200',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('School Management API')
        .setDescription('A comprehensive school management system with claims-based authorization')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Authentication', 'User authentication and authorization')
        .addTag('Users', 'User management')
        .addTag('Claims Management', 'Claims and permissions management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 School Management API is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();

})();

/******/ })()
;