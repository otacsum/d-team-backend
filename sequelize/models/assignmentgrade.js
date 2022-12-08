'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignmentGrade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssignmentGrade.init({
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
    assignment_id: {
        type: DataTypes.STRING,
        references: [
            {
                model: CourseAssignment,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
        ]
    },
    points_earned: DataTypes.INTEGER,
    is_extra_credit: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AssignmentGrade',
  });
  return AssignmentGrade;
};
