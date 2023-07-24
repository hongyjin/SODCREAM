const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Todo', {
    todoNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    todoContent: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    todoDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    achievement: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    achieveCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
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
    tableName: 'Todo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "todoNum" },
        ]
    },
  ]
});
};