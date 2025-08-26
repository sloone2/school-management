import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ClaimsModule } from './claims/claims.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    ClaimsModule,
    UsersModule,
    GroupsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

