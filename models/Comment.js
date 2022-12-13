const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    content: {
         type: DataTypes.STRING,
         allowNull:false
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'quiz',
          key: 'quiz_id',
        },},
     blog_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'blog',
              key: 'id',
            },
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
    modelName: 'comment',
});

module.exports=Comment