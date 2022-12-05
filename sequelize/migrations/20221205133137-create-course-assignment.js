'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CourseAssignments', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
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
      type: {
        type: Sequelize.STRING(16)
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      due_date: {
        type: Sequelize.DATEONLY
      },
      points_possible: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('CourseAssignments');
  }
};
