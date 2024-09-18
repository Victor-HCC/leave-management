import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { LeaveType } from "src/types/type";
import { cleanLeaveTypeData } from "../utils/dataCleaners";

@Injectable()
export class LeaveTypeRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll(): Promise<LeaveType[]> {

    const query = 'SELECT * FROM leave_types'
    const client = this.dbService.getClient()
    const result = await client.query(query)

    return result.rows.map(cleanLeaveTypeData)
  }

}