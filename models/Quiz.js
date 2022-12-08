const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quiz extends Model {}

Quiz.init({
    // add properites here, ex:
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    like: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   user_id: {
     type: DataTypes.INTEGER,
     references: {
       model: 'user',
       key: 'id',
     },
   },
   
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'quiz',
});

module.exports=Quiz