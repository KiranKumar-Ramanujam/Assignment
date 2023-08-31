require ("dotenv") .config()
const Pool = require("pg").Pool;

module. exports = {
HOST: process.env.DATABASE_HOST,
USER: process.env.DATABASE_USERNAME,
PASSWORD: process.env.DATABASE_PASSWORD,
DB: process.env.DATABASE,
PORT: process.env.DATABASE_PORT,
dialect: process.env.DIALECT,
pool: {
	max: 5,
	min: 0,
	acquire: 30000, 
	idle: 10000,
	},
};