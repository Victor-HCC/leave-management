import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { UserService } from 'src/user/user.service';
import { NewEmployee } from './dto/new-employee.dto';
import { LeaveService } from 'src/leave/leave.service';
import getWorkingDays from 'src/utils/daysCounter';
import { LeaveRequest, LeaveRequestStatus, User } from 'src/types/type';

@Injectable()
export class AdminService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly userService: UserService,
    private readonly leaveService: LeaveService
  ) {}

  async getAllEmployees() {
    return this.employeeService.getAllEmployees()
  }

  async getEmployeeById(id: number) {
    return this.employeeService.findEmployeeById(id)
  }

  async createUserAndEmployee(newEmployee: NewEmployee) {
    const { name, email, password, departmentId } = newEmployee

    const newUser = await this.userService.createUser({username: email, password})
    const employee = await this.employeeService.createEmployee({name, email, departmentId, userId: newUser.id, hireDate: new Date()})

    const leaveTypes = await this.leaveService.getAllLeaveTypes()

    for(const type of leaveTypes) {
      await this.leaveService.createLeaveBalance({
        employeeId: employee.id,
        leaveTypeId: type.id,
        balance: type.maxDaysPerYear
      })
    }
    return employee
  }

  async getAllLeaveRequests(page: number, limit:number) {
    return this.leaveService.getAllLeaveRequests(page, limit)
  }

  async updateLeaveRequest(id: number, status: string): Promise<LeaveRequest> {
    const updatedRequest: LeaveRequest = await this.leaveService.updateLeaveRequestStatus(id, status)

    if(status === 'approved') {
      const days = getWorkingDays(updatedRequest.startDate, updatedRequest.endDate)

      await this.leaveService.decreaseLeaveBalance(updatedRequest.employeeId, updatedRequest.leaveTypeId, days)
    }

    return updatedRequest
  }

  async getLeaveRequestsByStatus(status: LeaveRequestStatus): Promise<LeaveRequest[]> {
    return this.leaveService.getLeaveRequestsByStatus(status)
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const employee = await this.employeeService.findEmployeeById(id)

    return employee ? this.userService.softDeleteById(employee.userId) : false
  }

  async updateBalance(employeeId: number, leaveTypeId: number, balance: number): Promise<boolean> {
    return this.leaveService.updateLeaveBalanceByType(employeeId, leaveTypeId, balance)
  }

  async getUserById(id: number): Promise<User> {
    return this.userService.findUserById(id)
  }
  
}
