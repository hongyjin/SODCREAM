var DataTypes = require("sequelize").DataTypes;
var _Todo = require("./Todo");
var _User = require("./User");
var _User_char = require("./User_char");
var _category = require("./category");
var _char = require("./char");

function initModels(sequelize) {
  var Todo = _Todo(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var User_char = _User_char(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var char = _char(sequelize, DataTypes);


  return {
    Todo,
    User,
    User_char,
    category,
    char,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;