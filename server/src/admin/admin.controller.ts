import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { EmployeeService } from 'src/employee/employee.service';
import { NewEmployee } from './dto/new-employee.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('employees')
  async getEmployees() {
    return this.adminService.getAllEmployees()
  }

  @Get('employees/:id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getEmployeeById(id);
  }

  @Post('add-employee')
  async addEmployee(@Body() newEmployeeDto: NewEmployee) {
    return this.adminService.createUserAndEmployee(newEmployeeDto)
  }

  @Get('leave-requests')
  async getLeaveRequests(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.adminService.getAllLeaveRequests(page, limit)
  }
}
