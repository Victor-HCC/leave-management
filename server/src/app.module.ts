import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EmployeeModule, 
    DatabaseModule, AdminModule, UserModule, LeaveModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
