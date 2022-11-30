'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubjectArea extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SubjectArea.init({
        abbreviation: {
            type: DataTypes.STRING,
            references: {
                model: TeacherCredential,
                key: 'subject_abbreviation',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        name: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'SubjectArea',
    });
    return SubjectArea;
};
