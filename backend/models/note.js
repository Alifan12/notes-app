const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Note = sequelize.define('Note', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'notes',
});

module.exports = Note;
