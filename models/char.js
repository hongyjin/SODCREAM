const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('char', {
    modifier: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    charName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    evolutionNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    charDetail: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'char',
    timestamps: false
  });
};