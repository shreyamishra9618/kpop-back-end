const sequelize = require('../config/connection');
const {User,Blog} = require("../models")
const seedMe = async ()=>{
    await sequelize.sync({force:true})
    const users = [
        {
            email:"shreya@gmail.com",
            username:"Shreya",
            password:"password",
            picture:"logo512.png"
        },
        {
            email:"silvia@gmail.com",
            usernamme:"Silvia",
            password:"password1",
            picture:"logo512.png"
        },
        {
            email:"mo@gmail.com",
            username:"MO",
            password:"password2",
            picture:"logo512.png"
        },
        {
            email:"michelle@gmail.com",
            username:"Michelle",
            password:"password3" ,
            picture:"logo512.png"
        }
    ]
    const blogs = [
        {
            description:"Be the very best, like no one ever was",
            picture:"logo512.png",
            user_id:1
        },
        {
            description:"Like no one ever was",
            picture:"logo512.png",
            user_id:2
        },
        {
            description:"Be the very best",
            picture:"logo512.png",
            user_id:3
        },

    ]
    try{

        await User.bulkCreate(users,{
            individualHooks:true
        })
        await Blog.bulkCreate(blogs)
    }catch(err){
        throw err
    }
    process.exit(0);
}
seedMe()