import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'testing') {
  pool = new Pool({
    connectionString: process.env.TEST,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
export default pool;
