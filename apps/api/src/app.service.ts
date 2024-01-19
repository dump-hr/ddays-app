import { Injectable } from '@nestjs/common';
import { db } from 'db';
import { sql } from 'drizzle-orm';

@Injectable()
export class AppService {
  async healthCheck(): Promise<string> {
    await db.execute(sql`SELECT 1`);
    return 'ok';
  }
}
