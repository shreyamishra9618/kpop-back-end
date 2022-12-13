const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    // add properites here, ex:
    title:{
      type: DataTypes.STRING,
      allowNull:true
    },
    description: {
         type: DataTypes.TEXT,
         allowNull:false
    },
    picture: {
     type: DataTypes.STRING,
     allowNull: true,
   },
   user_id: {
     type: DataTypes.INTEGER,
     references: {
       model: 'user',
       key: 'id',
     },
   },
   username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

   
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
});

module.exports=Blog