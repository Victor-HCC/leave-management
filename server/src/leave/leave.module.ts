import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveRequestRepository } from './repositories/leave-request.repository';
import { LeaveBalanceRepository } from './repositories/leave-balance.repository';
import { LeaveTypeRepository } from './repositories/leave-type.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LeaveService, LeaveRequestRepository, LeaveBalanceRepository, LeaveTypeRepository]
})
export class LeaveModule {}
