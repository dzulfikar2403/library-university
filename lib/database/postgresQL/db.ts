
import config from '@/lib/config';
import { Pool } from '@neondatabase/serverless';

export const pool = new Pool({connectionString: config.env.databaseUrl,max: 10}); // pool connection

export default pool;