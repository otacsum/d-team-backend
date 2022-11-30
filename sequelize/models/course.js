'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    person_id: {
        type: DataTypes.STRING,
        references: [
            {
                model: Person,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
        ]
    },
    subject_abbreviation: {
        type: DataTypes.STRING,
        references: [
            {
                model: SubjectArea,
                key: 'abbreviation',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
        ]
    },
    code: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
