const express = require('express');
const router = express.Router();
const {User,Comment, Quiz, Blog} = require('../models');
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    Comment.findAll().then(CommentData=>{
        res.json(CommentData)
    }).catch(err=>{
        console.log(err);
        res.json({
            msg:"an error occurred",
            err,
        })
    })
})
router.get("/:id",(req,res)=>{
    Comment.findByPk(req.params.id,{
        include:[User,Quiz,Blog]
    }).then(CommentData=>{
        res.json(CommentData)
    }).catch(err=>{
        console.log(err);
        res.json({
            msg:"an error occurred",
            err,
        })
    })
})

router.post("/",(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        Comment.create({
            comment_id:req.body.Comment_id,
            content:req.body.content,
            quiz_id:req.body.quiz_id,
            blog_id:req.body.blog_id,
            // user_id:req.body.user_id

            user_id:userData.user_id
            
        }).then(CommentData=>{
            res.json(CommentData)
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    }
})

router.delete("/:id",(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        Comment.findByPk(req.params.id).then(foundComment=>{
            if(!foundComment){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundComment.UserId!==userData.id){
                return res.status(403).json({
                    msg:"you dont own this Comment!"
                })
            } else {
                Comment.destroy({
                    where:{
                        id:req.params.id
                    }
                }).then(delComment=>{
                    res.json(delComment)
                })
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    }
})
router.put("/:id",(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        Comment.findByPk(req.params.id).then(foundComment=>{
            if(!foundComment){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundComment.UserId!==userData.id){
                return res.status(403).json({
                    msg:"you dont own this Comment!"
                })
            } else {
                Comment.update(
                    req.body,
                    {
                    where:{
                        id:req.params.id
                    }
                }).then(delComment=>{
                    res.json(delComment)
                })
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    }
})

module.exports = router;