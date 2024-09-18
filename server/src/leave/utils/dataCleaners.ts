import { LeaveRequest, LeaveRequestStatus, LeaveType } from "src/types/type";

interface LeaveTypeRow {
  id: number;
  name: string;
  description: string;
  max_days_per_year: number;
}

export function cleanLeaveTypeData(row: LeaveTypeRow): LeaveType {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    maxDaysPerYear: row.max_days_per_year
  }
}

interface LeaveRequestRow {
  id: number;
  employee_id: number;
  start_date: Date;
  end_date: Date;
  leave_type_id: number;
  status: LeaveRequestStatus;
  reason: string;
  requested_at: Date;
  approved_at: Date | null;
  rejected_at: Date | null;
}

export function cleanLeaveRequestData(row: LeaveRequestRow): LeaveRequest {
  return {
    id: row.id,
    employeeId: row.employee_id,
    startDate: row.start_date,
    endDate: row.end_date,
    leaveTypeId: row.leave_type_id,
    status: row.status,
    reason: row.reason,
    requestedAt: row.requested_at,
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at
  }
}