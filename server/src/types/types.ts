export interface EmployeeInput {
  name: string
  email: string
  departmentId: number
  userId: number
  hireDate: Date
}

export interface Employee {
  id: number
  name: string
  email: string
  departmentId: number
  userId: number
  hireDate: Date
}

export interface LeaveType {
  id: number
  name: string
  description: string
  maxDaysPerYear: number
}

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

export interface LeaveRequestWithName {
  id: number
  startDate: Date
  endDate: Date
  leaveTypeId: number
  nameLeaveType: string
  status: LeaveRequestStatus
  reason: string
  requestedAt: Date
  approvedAt?: Date | null
  rejectedAt?: Date | null
}

export interface LeaveBalanceInput {
  employeeId: number
  leaveTypeId: number
  balance: number
}

export interface LeaveBalance {
  id: number
  employeeId: number
  leaveTypeId: number
  balance: number
}

export interface LeaveBalanceWithName {
  id: number
  employeeId: number
  leaveTypeId: number
  nameLeaveType: string
  balance: number
}

export interface LeaveRequestInput {
  employeeId: number
  startDate: Date
  endDate: Date
  leaveTypeId: number
  reason: string
}

export interface User {
  id: number
  username: string
  password: string
  role: 'employee' | 'admin'
  active: boolean
}

export interface UserInput {
  username: string
  password: string
}

export type UpdateFields = {
  [key: string]: string | number | boolean | Date
}

export type AllEmployees = ({
  employees: Employee[],
  totalCount: number
})

export type AllLeaveRequests = ({
  leaveRequests: LeaveRequest[],
  totalCount: number,
  page: number,
  limit: number
})

export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected'