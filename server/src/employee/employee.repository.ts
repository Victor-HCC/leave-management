import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateEmployee } from "./dto/create-employee.dto";
import { cleanEmployeeData } from "./utils/dataCleaners";

@Injectable()
export class EmployeeRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async create(employeeDto: CreateEmployee): Promise<any> {
    const { name, email, departmentId, userId, hireDate } = employeeDto
    const query = 'INSERT INTO employees (name, email, department_id, user_id, hire_date) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [name, email, departmentId, userId, hireDate]
    const client = this.dbService.getClient()
    return client.query(query, values)
  }

  async getAll() {
    const query = `SELECT em.id, em.name, em.email, em.department_id, em.user_id, em.hire_date
      FROM employees em
      JOIN users ON users.id = em.user_id
      WHERE users.active = true`
    
    const client = this.dbService.getClient()
    const result = await client.query(query)
    return result.rows.map(cleanEmployeeData)
  }

  async findById(id: number) {
    const query = `SELECT * FROM employees WHERE id = $1`
    const client = this.dbService.getClient()
    const result = await client.query(query, [id])

    return cleanEmployeeData(result.rows[0])
  }
}