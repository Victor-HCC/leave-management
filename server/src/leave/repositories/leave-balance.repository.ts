import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { LeaveBalanceInput } from "../dto/leave-balance-input.dto";

@Injectable()
export class LeaveBalanceRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async create(leaveBalance: LeaveBalanceInput): Promise<any> {
    const query = `
      INSERT INTO leave_balances (employee_id, leave_type_id, balance)
      VALUES ($1, $2, $3) RETURNING *`;
    
    const values = [leaveBalance.employeeId, leaveBalance.leaveTypeId, leaveBalance.balance]

    const client = this.dbService.getClient()
    return client.query(query, values)
  }

  async findByEmployeeId(employeeId: number): Promise<any> {
    const query = `
      SELECT lb.id, lb.employee_id, lb.leave_type_id, lt.name AS name_leave_type, lb.balance
      FROM leave_balances lb
      JOIN leave_types lt
      ON lb.leave_type_id = lt.id
      WHERE lb.employee_id = $1`;
    
    const values = [employeeId]

    const client = this.dbService.getClient()

    return client.query(query, values)
  }

  async findByEmployeeIdAndLeaveTypeId(employeeId: number, leaveTypeId: number): Promise<any> {
    const query = `SELECT * FROM leave_balances WHERE employee_id = $1 AND leave_type_id = $2`

    const values = [employeeId, leaveTypeId]
    const client = this.dbService.getClient()

    return client.query(query, values)
  }

  async decreaseLeaveBalance(employeeId: number, leaveTypeId: number, days: number): Promise<void> {
    const query = `SELECT * FROM decrease_leave_balance($1, $2, $3)`
    const values = [employeeId, leaveTypeId, days]
    const client = this.dbService.getClient()
    client.query(query, values)
  }

  async updateLeaveBalanceByType(employeeId: number, leaveTypeId: number, balance: number): Promise<boolean> {
    const query = `UPDATE leave_balances
      SET balance = $1
      WHERE employee_id = $2 AND leave_type_id = $3`

    const values = [employeeId, leaveTypeId, balance]
    const client = this.dbService.getClient()

    const result = await client.query(query, values)

    return result.rowCount? result.rowCount > 0 : false
  }
}