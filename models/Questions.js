const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Questions extends Model { }

Questions.init({
    // add properites here, ex:
    Questions_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
    question_content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    option1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option4: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correct_ans: {
        type: DataTypes.STRING
        // allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'quiz',
            key: 'quiz_id',
        },
    },

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'questions',
});

module.exports = Questions