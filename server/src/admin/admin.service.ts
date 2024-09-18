import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { UserService } from 'src/user/user.service';
import { NewEmployee } from './dto/new-employee.dto';
import { LeaveService } from 'src/leave/leave.service';

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
}
