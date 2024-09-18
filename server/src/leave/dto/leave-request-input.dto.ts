export interface LeaveRequestInput {
  employeeId: number
  startDate: Date
  endDate: Date
  leaveTypeId: number
  reason: string
}