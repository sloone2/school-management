import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { Staff } from './entities/staff.entity';
import { Parent } from './entities/parent.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['claims', 'claims.claim', 'student', 'staff', 'parent'],
    });
  }

  async findStudents(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['user', 'parents'],
    });
  }

  async findStaff(): Promise<Staff[]> {
    return this.staffRepository.find({
      relations: ['user'],
    });
  }

  async findParents(): Promise<Parent[]> {
    return this.parentRepository.find({
      relations: ['user', 'children'],
    });
  }
}

