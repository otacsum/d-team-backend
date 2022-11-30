'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Courses', {
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
            subject_abbreviation: {
                allowNull: false,
                type: Sequelize.STRING(4),
                references: {
                    model: {
                        tableName: 'SubjectAreas',
                        schema: 'public'
                    },
                    key: 'abbreviation'
                }
            },
            code: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            start_date: {
                type: Sequelize.DATEONLY
            },
            end_date: {
                type: Sequelize.DATEONLY
            },
            is_active: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('Courses');
    }
};
