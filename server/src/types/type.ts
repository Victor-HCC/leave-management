export interface LeaveType {
  id: number
  name: string
  description: string
  maxDaysPerYear: number
}

export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected'

export interface LeaveRequest {
  id: number
  employeeId: number
  startDate: Date
  endDate: Date
  leaveTypeId: number
  status: LeaveRequestStatus
  reason: string
  requestedAt: Date
  approvedAt?: Date | null
  rejectedAt?: Date | null
}

export interface User {
  id: number
  username: string
  password: string
  role: 'employee' | 'admin'
  active: boolean
}