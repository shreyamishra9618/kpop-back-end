const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    // add properites here, ex:
    description: {
         type: DataTypes.STRING,
         allowNull:false
    },
    picture: {
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
    modelName: 'blog',
});

module.exports=Blog