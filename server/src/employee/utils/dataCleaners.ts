import { GetEmployeeDTO } from "../dto/get-employee.dto";

export function cleanEmployeeData(row: GetEmployeeDTO) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    departmentId: row.department_id,
    userId: row.user_id,
    hireDate: row.hire_date
  }
}

