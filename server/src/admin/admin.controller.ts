import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly employeeService: EmployeeService
  ) {}

  @Get('employees')
  async getEmployees() {
    return this.employeeService.getAllEmployees()
  }
}
