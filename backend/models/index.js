const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notes_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
