const pool = {
	min: process.env.KNEX_MIN_POOL ?? 2,
	max: process.env.KNEX_MAX_POOL ?? 10,
	acquireTimeoutMillis: process.env.KNEX_TINEOUT ?? 30 * 1000
};

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST || "localhost",
			port: process.env.DB_PORT || 3307,
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "123456",
			database: process.env.DB_NAME || "bonat_db",
			charset: 'utf8mb4'
		},
		debug: true,
		pool,
		migrations: {
			directory: "data/migrations",
			tableName: 'migrations'
		},
		seeds: {
			directory: "data/seeds",
			tableName: 'seeds'
		}
	},
	production: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			charset: 'utf8mb4'
		},
		pool,
		migrations: {
			directory: "data/migrations",
			tableName: 'migrations'
		},
		seeds: {
			directory: "data/seeds",
			tableName: 'seeds'
		}
	},
};
