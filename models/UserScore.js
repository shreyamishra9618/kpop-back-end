const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserScore extends Model { }

UserScore.init({
    // add properites here, ex:
    UserScore_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    no_of_ques: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'quiz',
            key: 'quiz_id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userScore',
});

module.exports = UserScore