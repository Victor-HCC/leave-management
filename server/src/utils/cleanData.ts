import { Employee, LeaveType, LeaveRequest, LeaveBalance, LeaveBalanceWithName, LeaveRequestWithName, LeaveRequestStatus } from "../types/types";

interface EmployeeRow {
  id: number;
  name: string;
  email: string;
  department_id: number;
  user_id: number;
  hire_date: Date;
}

interface LeaveTypeRow {
  id: number;
  name: string;
  description: string;
  max_days_per_year: number;
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

interface LeaveRequestWithNameRow {
  id: number;
  start_date: Date;
  end_date: Date;
  leave_type_id: number;
  name_leave_type: string;
  status: LeaveRequestStatus;
  reason: string;
  requested_at: Date;
  approved_at: Date | null;
  rejected_at: Date | null;
}

interface LeaveBalanceRow {
  id: number;
  employee_id: number;
  leave_type_id: number;
  balance: number;
}

interface LeaveBalanceWithNameRow {
  id: number;
  employee_id: number;
  leave_type_id: number;
  name_leave_type: string;
  balance: number;
}


function cleanEmployeeData(row: EmployeeRow): Employee {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    departmentId: row.department_id,
    userId: row.user_id,
    hireDate: row.hire_date
  }
}

function cleanLeaveTypeData(row: LeaveTypeRow): LeaveType {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    maxDaysPerYear: row.max_days_per_year
  }
}

function cleanLeaveRequestData(row: LeaveRequestRow): LeaveRequest {
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

function cleanLeaveRequestWithNameData(row: LeaveRequestWithNameRow): LeaveRequestWithName {
  return {
    id: row.id,
    startDate: row.start_date,
    endDate: row.end_date,
    leaveTypeId: row.leave_type_id,
    nameLeaveType: row.name_leave_type,
    status: row.status,
    reason: row.reason,
    requestedAt: row.requested_at,
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at
  }
}

function cleanLeaveBalanceData(row: LeaveBalanceRow): LeaveBalance {
  return {
    id: row.id,
      employeeId: row.employee_id,
      leaveTypeId: row.leave_type_id,
      balance: row.balance
  }
}

function cleanLeaveBalanceDataWithName(row: LeaveBalanceWithNameRow): LeaveBalanceWithName {
  return {
    id: row.id, 
    employeeId: row.employee_id, 
    leaveTypeId: row.leave_type_id, 
    nameLeaveType: row.name_leave_type,
    balance: row.balance
  }
}

export {
  cleanEmployeeData,
  cleanLeaveTypeData,
  cleanLeaveRequestData,
  cleanLeaveBalanceData,
  cleanLeaveBalanceDataWithName,
  cleanLeaveRequestWithNameData
}