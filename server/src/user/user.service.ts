import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUser } from './dto/create-user.dto';
import { User } from 'src/types/type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: CreateUser) {
    return this.userRepository.create(userDto);
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findById(id)
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username)
  }

  async softDeleteById(id:number): Promise<boolean> {
    return this.userRepository.softDeleteById(id)
  }
}
