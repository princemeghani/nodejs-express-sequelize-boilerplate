'use strict';
const { Model } = require('sequelize');
const PROTECTED_ATTRIBUTES = [
  'deletedAt',
  'createdAt',
  'updatedAt',
  'updatedBy',
  'createdBy',
];

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toJSON() {
      // Hide protected fields
      let attributes = Object.assign({}, this.get());
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }

    static associate(models) {
      models.User.hasMany(Task, { foreignKey: 'createdBy' });
      models.User.hasMany(Task, { foreignKey: 'updatedBy' });
      Task.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'createdBy',
      });
      Task.belongsTo(models.User, {
        as: 'updater',
        foreignKey: 'updatedBy',
      });
    }
  }
  Task.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      paranoid: true, // Enable soft deletion
      timestamps: true, // Enable timestamps
    }
  );

  return Task;
};
