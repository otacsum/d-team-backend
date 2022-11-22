'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('People', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING(32)
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            street_address: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            state_abbreviation: {
                type: Sequelize.STRING(2)
            },
            zip_code: {
                type: Sequelize.INTEGER
            },
            pass_hash: {
                type: Sequelize.STRING(60)
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
        await queryInterface.dropTable('People');
    }
};
