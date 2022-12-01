'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CourseStudent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CourseStudent.init({
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
        is_active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'CourseStudent',
    });
    return CourseStudent;
};
