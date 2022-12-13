const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    Blog.findAll({order:[['id', 'DESC'],]}).then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.json({
            msg:"an error occurred",
            err,
        })
    })
})
router.get("/:id",(req,res)=>{
    Blog.findByPk(req.params.id,{
        include:[User]
    }).then(blogData=>{
        res.json(blogData)
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
        Blog.create({
            title: req.body.title,
            description: req.body.description,
            picture: req.body.picture,
            user_id:userData.user_id,
            username: req.body.username
        }).then(blogData=>{
            res.json(blogData)
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
        Blog.findByPk(req.params.id).then(foundBlog=>{
            if(!foundBlog){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundBlog.UserId!==userData.user_id){
                return res.status(403).json({
                    msg:"you dont own this Blog!"
                })
            } else {
                Blog.destroy({
                    where:{
                        id:req.params.user_id
                    }
                }).then(delBlog=>{
                    res.json(delBlog)
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
        Blog.findByPk(req.params.id).then(foundBlog=>{
            if(!foundBlog){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundBlog.UserId!==userData.user_id){
                return res.status(403).json({
                    msg:"you dont own this Blog!"
                })
            } else {
                Blog.update(
                    req.body,
                    {
                    where:{
                        id:req.params.user_id
                    }
                }).then(delBlog=>{
                    res.json(delBlog)
                })
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    }
})

module.exports = router;