import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Student } from '../users/entities/student.entity';
import { Staff } from '../users/entities/staff.entity';
import { Parent } from '../users/entities/parent.entity';
import { Claim } from '../claims/entities/claim.entity';
import { UserClaim } from '../claims/entities/user-claim.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_NAME', 'school_management'),
        entities: [User, Student, Staff, Parent, Claim, UserClaim],
        synchronize: configService.get('NODE_ENV') !== 'production', // Only in development
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

