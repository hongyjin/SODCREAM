const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    userId: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mainCharName: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};