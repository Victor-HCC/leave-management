import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { DatabaseModule } from 'src/database/database.module';
import { LeaveService } from 'src/leave/leave.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { LeaveBalanceRepository } from 'src/leave/repositories/leave-balance.repository';
import { LeaveRequestRepository } from 'src/leave/repositories/leave-request.repository';
import { LeaveTypeRepository } from 'src/leave/repositories/leave-type.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, EmployeeService, EmployeeRepository, UserService, UserRepository, LeaveService, LeaveBalanceRepository, LeaveRequestRepository, LeaveTypeRepository],
})
export class AdminModule {}
