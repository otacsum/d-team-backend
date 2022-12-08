'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('AssignmentGrades', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            person_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'People',
                        schema: 'public'
                    },
                    key: 'id'
                }
            },
            assignment_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'CourseAssignments',
                        schema: 'public'
                    },
                    key: 'id'
                }
            },
            points_earned: {
                type: Sequelize.INTEGER
            },
            is_extra_credit: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('AssignmentGrades');
    }
};
