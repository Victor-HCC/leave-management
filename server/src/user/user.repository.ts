import { DatabaseService } from "src/database/database.service";
import { CreateUser } from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async create(userDto: CreateUser): Promise<any> {
    const { username, password } = userDto
    const hashPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *'
    const values = [username, hashPassword]

    const client = this.dbService.getClient()
    const result = await client.query(query, values)
    
    return result.rows[0]
  }


}