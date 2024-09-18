import { Injectable } from '@nestjs/common';
import { LeaveRequestRepository } from './repositories/leave-request.repository';
import { LeaveTypeRepository } from './repositories/leave-type.repository';
import { LeaveBalanceRepository } from './repositories/leave-balance.repository';
import { LeaveRequestInput } from './dto/leave-request-input.dto';
import { LeaveBalanceInput } from './dto/leave-balance-input.dto';
import { LeaveRequest } from 'src/types/type';

@Injectable()
export class LeaveService {
  constructor(
    private readonly leaveRequestRepository: LeaveRequestRepository,
    private readonly leaveTypeRepository: LeaveTypeRepository,
    private readonly leaveBalanceRepository: LeaveBalanceRepository
  ) {}

  async createLeaveRequest(leaveRequest: LeaveRequestInput) {
    return this.leaveRequestRepository.create(leaveRequest)
  }

  async getAllLeaveRequests(page: number, limit: number) {
    return this.leaveRequestRepository.getAll(page, limit)
  }

  async getLeaveRequestById(id: number) {
    return this.leaveRequestRepository.findById(id)
  }

  async getLeaveRequestsByEmployeeId(employeeId: number) {
    return this.leaveRequestRepository.findByEmployeeId(employeeId)
  }

  async getLeaveRequestsByStatus(status: string) {
    return this.leaveRequestRepository.findByStatus(status)
  }

  async updateLeaveRequestStatus(id: number, status: string): Promise<LeaveRequest> {
    return this.leaveRequestRepository.updateStatus(id, status)
  }

  async deleteLeaveRequest(id) {
    return this.leaveRequestRepository.deleteById(id)
  }

  async createLeaveBalance(leaveBalance: LeaveBalanceInput) {
    return this.leaveBalanceRepository.create(leaveBalance)
  }

  async getLeaveBalancesByEmployeeId(employeeId: number) {
    return this.leaveBalanceRepository.findByEmployeeId(employeeId)
  }

  async getLeaveBalanceByEmployeeAndLeaveTypeId(employeeId: number, leaveTypeId: number) {
    return this.leaveBalanceRepository.findByEmployeeIdAndLeaveTypeId(employeeId, leaveTypeId)
  }

  async decreaseLeaveBalance(employeeId: number, leaveTypeId: number, days: number) {
    return this.leaveBalanceRepository.decreaseLeaveBalance(employeeId, leaveTypeId, days)
  }

  async updateLeaveBalanceByType(employeeId: number, leaveTypeId: number, balance: number) {
    return this.leaveBalanceRepository.updateLeaveBalanceByType(employeeId, leaveTypeId, balance)
  }

  async getAllLeaveTypes() {
    return this.leaveTypeRepository.getAll()
  }
}
