'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TeacherCredentials', {
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
            job_title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            rank: {
                allowNull: false,
                type: Sequelize.STRING(32)
            },
            credential_type: {
                allowNull: false,
                type: Sequelize.STRING(32)
            },
            subject_abbreviation: {
                allowNull: false,
                type: Sequelize.STRING(4)
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
        await queryInterface.dropTable('TeacherCredentials');
    }
};
