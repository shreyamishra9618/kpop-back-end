const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    // add properites here, ex:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    email: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    username: {
        type: DataTypes.STRING  
   },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    hooks:{
        beforeCreate:function(userObj){
            userObj.password = bcrypt.hashSync(userObj.password,5)
            return userObj
        }
    }
});

module.exports=User