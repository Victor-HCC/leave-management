import { DatabaseService } from "src/database/database.service";
import { CreateUser } from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import { Injectable } from "@nestjs/common";
import { User } from "src/types/type";

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

  async findById(id: number): Promise<User> {
    const client = this.dbService.getClient()
    const result = await client.query('SELECT * FROM users WHERE id = $1', [id])
    const user: User = result.rows[0]

    return user
  }

  async findByUsername(username: string): Promise<User> {
    const client = this.dbService.getClient()
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND active = true', [username])
    const user: User = result.rows[0]

    return user
  }

  async softDeleteById(id: number): Promise<boolean> {
    const client = this.dbService.getClient()
    const result = await client.query('UPDATE users SET active = false WHERE id = $1', [id])

    return result.rowCount > 0
  }

}