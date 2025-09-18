import mysql from "mysql2/promise";

// Lazy singleton pool to avoid throwing during module import
let globalPool: mysql.Pool | undefined = (global as any)._mysqlPool;

function createPoolFromEnv(): mysql.Pool | undefined {
	const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_CONN_LIMIT } = process.env;
	if (!DB_HOST || !DB_USER || !DB_NAME) {
		return undefined;
	}
	return mysql.createPool({
		host: DB_HOST,
		port: DB_PORT ? Number(DB_PORT) : 3306,
		user: DB_USER,
		password: DB_PASSWORD && DB_PASSWORD.length > 0 ? DB_PASSWORD : undefined,
		database: DB_NAME,
		waitForConnections: true,
		connectionLimit: DB_CONN_LIMIT ? Number(DB_CONN_LIMIT) : 10,
		queueLimit: 0,
		enableKeepAlive: true,
	});
}

function ensurePool(): mysql.Pool {
	if (!globalPool) {
		globalPool = createPoolFromEnv();
		if (globalPool) {
			(global as any)._mysqlPool = globalPool;
		}
	}
	if (!globalPool) {
		throw new Error("Database is not configured. Please set DB_HOST, DB_USER, DB_NAME in .env.local");
	}
	return globalPool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
	const pool = ensurePool();
	const [rows] = await pool.query(sql, params);
	return rows as T[];
}

export async function getConnection() {
	return ensurePool().getConnection();
} 