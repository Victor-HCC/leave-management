import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { NewEmployee } from './dto/new-employee.dto';
import { LeaveRequestStatus } from 'src/types/type';

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

  @Patch('leave-requests/:id')
  async updateLeaveRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() status: LeaveRequestStatus
  ) {
    return this.adminService.updateLeaveRequest(id, status)
  }

  @Get('leave-requests/status/:status')
  async getLeaveRequestsByStatus(@Param('status') status: LeaveRequestStatus) {
    return this.adminService.getLeaveRequestsByStatus(status)
  }

  @Delete('delete-employee/:employeeId')
  async deleteEmployee(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.adminService.deleteEmployee(employeeId)
  }

  @Patch('update-balance/:employeeId')
  async updateEmployeeBalance(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body('leaveTypeId', ParseIntPipe) leaveTypeId: number,
    @Body('balance', ParseIntPipe) balance: number
  ) {
    return this.adminService.updateBalance(employeeId, leaveTypeId, balance)
  }

  @Get('get-user/:userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.adminService.getUserById(userId)
  }
}
