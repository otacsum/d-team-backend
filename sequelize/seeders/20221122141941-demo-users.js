const uuid = require('uuid');
const bcrypt = require('bcrypt');

const numPeople = 9; // Number of people to generate in the migration.
const passwords = [];

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await generatePasswords()
            .then(() => {
                return queryInterface.bulkInsert('People', generatePeople(), {});
            });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('People', null, {});
    }
};

function generatePeople() {
    let people = [];
    for (let i = 0; i < numPeople; i++) {
        people.push(
            {
                id: uuid.v4(),
                type: "student",
                first_name: `testFirstname-${i}`,
                last_name: `testLastname-${i}`,
                email: `test.mail${i}@test.test`,
                street_address: `testAddress-${i}`,
                city: `testCity-${i}`,
                state_abbreviation: "AA",
                zip_code: 12345,
                pass_hash: passwords[i],
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        )
    }
    return people;
}

async function generatePasswords() {
    const saltOrRounds = 14;

    for (let i = 0; i < numPeople; i++) {
        passwords.push(await bcrypt.hash(`testPass${i}`, saltOrRounds));
    }
}
