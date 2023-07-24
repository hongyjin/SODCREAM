const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_char', {
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    modifier: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'User_char',
    timestamps: false
  });
};