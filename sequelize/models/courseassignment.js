'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CourseAssignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CourseAssignment.init({
        course_id: {
            type: DataTypes.STRING,
            references: [
                {
                    model: Course,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                },
            ]
        },
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        due_date: DataTypes.DATE,
        points_possible: DataTypes.INTEGER,
        is_active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'CourseAssignment',
    });
    return CourseAssignment;
};
