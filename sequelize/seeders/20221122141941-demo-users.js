const uuid = require('uuid');

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('People', generatePeople(3), {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('People', null, {});
    }
};

function generatePeople(count) {
    let people = [];
    for (let i = 0; i < count; i++) {
        people.push(
            {
                id: uuid.v4(),
                type: "student",
                first_name: `testFirstname-${i}`,
                last_name: `testLastname-${i}`,
                email: `testEmail-${i}`,
                street_address: `testAddress-${i}`,
                city: `testCity-${i}`,
                state_abbreviation: "AA",
                zip_code: 12345,
                pass_hash: `testPass-${i}`,
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        )
    }
    return people;
}
