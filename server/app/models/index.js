const dbConfig = require('../config/db.config.js');

const hostName = dbConfig.HOST;
const userName = dbConfig.USER;
const password = dbConfig.PASSWORD;
const database = dbConfig.DB;
const dialect = dbConfig.dialect;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(database, userName, password, {
  host: hostName,
  dialect: dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;
