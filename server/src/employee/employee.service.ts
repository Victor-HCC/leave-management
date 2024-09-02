import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployee } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(employeeDto: CreateEmployee) {
    return this.employeeRepository.create(employeeDto)
  }

  async getAllEmployees() {
    return this.employeeRepository.getAll()
  }
}
