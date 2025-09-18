import mysql from "mysql2/promise";

// Define global type augmentation
declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

// Lazy singleton pool to avoid throwing during module import
let globalPool: mysql.Pool | undefined = global._mysqlPool;

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
			global._mysqlPool = globalPool;
		}
	}
	if (!globalPool) {
		throw new Error("Database is not configured. Please set DB_HOST, DB_USER, DB_NAME in .env.local");
	}
	return globalPool;
}

// Define a type for query parameters
type QueryParams = string | number | boolean | null | Buffer | Date | Array<QueryParams>;

export async function query<T>(sql: string, params?: QueryParams[]): Promise<T[]> {
	const pool = ensurePool();
	const [rows] = await pool.query(sql, params);
	return rows as T[];
}

export async function getConnection() {
	return ensurePool().getConnection();
}