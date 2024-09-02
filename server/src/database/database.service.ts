import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.pool = new Pool({
      user: this.configService.get<string>('DB_USER'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT')
    })

    await this.pool.connect()
  }

  async onModuleDestroy() {
    await this.pool.end()
  }

  getClient() {
    return this.pool
  }
}
