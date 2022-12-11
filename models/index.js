const User = require("./User")
const Blog = require("./Blog")
const Comment = require('./Comment');
const Questions = require('./Questions');
const Quiz = require('./Quiz');
const UserScore = require('./UserScore');

User.hasMany(Blog);
Blog.belongsTo(User);
User.hasMany(Quiz);
Quiz.belongsTo(User);
// User.hasMany(Quiz,{
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
//   });
// Quiz.belongsTo(User, {
//     foreignKey: 'user_id'
//   });
Quiz.hasMany(Questions,{
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
  });
Questions.belongsTo(Quiz,{
    foreignKey: 'quiz_id',
  });
Blog.hasMany(Comment,{
    foreignKey: 'id',
    onDelete: 'CASCADE'
  });
Comment.belongsTo(Blog,{
    foreignKey: 'id',
  });
Quiz.hasMany(Comment,{
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
  });
Comment.belongsTo(Quiz,{
    foreignKey: 'quiz_id'
  });
User.hasOne(UserScore,{
    foreignKey: 'user_id',
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
  });
UserScore.belongsTo(User,{
    foreignKey: 'user_id'
  });




module.exports = {
    User,
    Blog,
    Comment,
    Questions,
    Quiz,
    UserScore
}






