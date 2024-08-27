import LeaveBalanceRepository from '../repositories/LeaveBalanceRepositoryImpl'
import LeaveRequestRepository from '../repositories/LeaveRequestRepositoryImpl'
import { LeaveBalance, LeaveBalanceWithName, LeaveRequest, LeaveRequestWithName } from '../types/types'
import getWorkingDays from '../utils/daysCounter'

const leaveBalanceRepository = new LeaveBalanceRepository()
const leaveRequestRepository = new LeaveRequestRepository()

export const getLeaveBalanceByEmployeeId = async (employeeId: number): Promise<LeaveBalanceWithName[]> => {
  const result = await leaveBalanceRepository.findByEmployeeId(employeeId)

  return result
}

export const createLeaveRequest = 
  async (employeeId: number, startDate: Date, endDate: Date, leaveTypeId: number, reason: string): Promise<LeaveRequest> => {
    const requestedDays = getWorkingDays(startDate, endDate)
    const leaveBalance: LeaveBalance | null = await leaveBalanceRepository.findByEmployeeIdAndLeaveTypeId(employeeId, leaveTypeId)

    if(!leaveBalance) { throw new Error(`No leave balance for the leave type id.`)}

    if(requestedDays > leaveBalance.balance) {
      throw new Error(`Insufficient leave balance. You have ${leaveBalance.balance} days, but requested ${requestedDays} days.`)
    }

    const newLeaveRequest: LeaveRequest = await leaveRequestRepository.create({ employeeId, startDate, endDate, leaveTypeId, reason })

    return newLeaveRequest
  }

export const getLeaveHistoryByEmployeeId = async (employeeId: number): Promise<LeaveRequestWithName[]> => {
  const leaveHistory = await leaveRequestRepository.findByEmployeeId(employeeId)

  return leaveHistory
}