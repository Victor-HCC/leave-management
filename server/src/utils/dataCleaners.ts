import { LeaveType } from "src/types/type";

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