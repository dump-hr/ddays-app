import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import 'dotenv/config';

const client = postgres(process.env.DATABASE_URL, {
  //   ssl: 'require',
});

export const db: PostgresJsDatabase = drizzle(client);
