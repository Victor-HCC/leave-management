import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, EmployeeService, EmployeeRepository],
})
export class AdminModule {}
