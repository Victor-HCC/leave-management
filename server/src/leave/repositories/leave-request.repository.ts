import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { LeaveRequestInput } from "../dto/leave-request-input.dto";

@Injectable()
export class LeaveRequestRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async create(leaveRequest: LeaveRequestInput): Promise<any> {
    const query = 'SELECT * FROM insert_leave_request($1, $2, $3, $4, $5)'
    const values = [leaveRequest.employeeId, leaveRequest.startDate, leaveRequest.endDate, leaveRequest.leaveTypeId, leaveRequest.reason]
    const client = this.dbService.getClient()

    return client.query(query, values)
  }

  async getAll(page = 1, limit = 10): Promise<any> {
    const offset = (page - 1) * limit

    const client = this.dbService.getClient()

    const result = await client.query(
      `SELECT * FROM leave_requests ORDER BY requested_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    )

    const totalCountResult = await client.query(
      `SELECT COUNT(*) FROM leave_requests`
    )

    const totalCount = parseInt(totalCountResult.rows[0].count, 10)

    return { leaveRequests: result.rows, totalCount, page, limit }
  }

  async findById(id: number): Promise<any> {
    const client = this.dbService.getClient()
    const result = await client.query(
      `SELECT * FROM leave_requests WHERE id = $1`, [id]
    )

    return result.rows[0]
  }

  async findByEmployeeId(employeeId: number): Promise<any> {
    const query = `SELECT lr.id, lr.leave_type_id, lr.start_date, lr.end_date, lr.status, lr.reason, lr.requested_at, lr.approved_at, lr.rejected_at, lt.name AS name_leave_type
      FROM leave_requests lr
      JOIN leave_types lt 
      ON lr.leave_type_id = lt.id
      WHERE lr.employee_id = $1`
    const values = [employeeId]
    const client = this.dbService.getClient()

    const result = await client.query(query, values)

    return result.rows.length ? result.rows : []
  }

  async findByStatus(status: string): Promise<any> {
    const client = this.dbService.getClient()
    const result = await client.query(`SELECT * FROM leave_requests WHERE status = $1`, [status])

    if(result.rows.length === 0) return null

    return result.rows
  }

  async updateStatus(id: number, status: string): Promise<any> {
    const client = this.dbService.getClient()
    const result = await client.query(
      `SELECT * FROM update_leave_request_status($1, $2)`,
      [id, status]
    )

    return result.rows[0]
  }

  async deleteById(id: number): Promise<boolean> {
    const client = this.dbService.getClient()
    const result = await client.query(
      `DELETE FROM leave_requests WHERE id = $1`, [id]
    )

    if(result.rowCount === 0) {
      return false
    }

    return true
  }
}