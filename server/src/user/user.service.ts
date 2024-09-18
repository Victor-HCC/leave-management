import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: CreateUser) {
    return this.userRepository.create(userDto);
  }
}
