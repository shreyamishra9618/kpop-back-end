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
Quiz.hasMany(Questions);
Questions.belongsTo(Quiz);
Blog.hasMany(Comment);
Comment.belongsTo(Blog);
Quiz.hasMany(Comment);
Comment.belongsTo(Quiz);
User.hasOne(UserScore);
UserScore.belongsTo(User);




module.exports = {
    User,
    Blog,
    Comment,
    Questions,
    Quiz,
    UserScore
}






