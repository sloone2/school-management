import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { Staff } from './entities/staff.entity';
import { Parent } from './entities/parent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student, Staff, Parent])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

