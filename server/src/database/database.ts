import { Pool } from 'pg';

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'todofullstack',
	password: '19922',
	port: 5432,
});

export default pool;