const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    categoryName: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false
  });
};