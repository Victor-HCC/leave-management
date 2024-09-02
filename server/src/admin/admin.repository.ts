import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class AdminRepository {
  constructor(private readonly dbService: DatabaseService) {}

  
}