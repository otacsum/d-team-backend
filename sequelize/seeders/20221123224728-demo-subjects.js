const uuid = require('uuid');

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('SubjectAreas', demoSubjects, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('SubjectAreas', null, {});
    }
};

const demoSubjects = [
    {
        id: uuid.v4(),
        abbreviation: 'HIST',
        name: 'World History',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'PHYS',
        name: 'Physics',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'CSE',
        name: 'Computer Science & Engineering',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'MATH',
        name: 'Mathematics',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'LIT',
        name: 'Literature & Language Arts',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'ECON',
        name: 'Economics',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'CHEM',
        name: 'Chemistry & Bio-Chemistry',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: uuid.v4(),
        abbreviation: 'MUS',
        name: 'Music Theory & Performance',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
];
