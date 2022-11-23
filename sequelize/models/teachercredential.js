'use strict';
const {
  Model
} = require('sequelize');
const person = require('./person');
module.exports = (sequelize, DataTypes) => {
  class TeacherCredential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeacherCredential.init({
    person_id: {
        type: DataTypes.STRING,
        references: {
            model: Person,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    job_title: DataTypes.STRING,
    rank: DataTypes.STRING,
    credential_type: DataTypes.STRING,
    subject_abbreviation: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TeacherCredential',
  });
  return TeacherCredential;
};
