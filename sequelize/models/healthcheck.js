'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Healthcheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Healthcheck.init({
    last_check: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Healthcheck',
  });
  return Healthcheck;
};