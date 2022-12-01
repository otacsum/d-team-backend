'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CourseStudents', {
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
            course_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'Courses',
                        schema: 'public'
                    },
                    key: 'id'
                }
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
        await queryInterface.dropTable('CourseStudents');
    }
};
