const express = require('express');
const router = express.Router();
const {User,Questions, Quiz,Comment} = require('../models');
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    Quiz.findAll({include:[User,Questions,Comment]}).then(QuizData=>{
        res.json(QuizData)
    }).catch(err=>{
        console.log(err);
        res.json({
            msg:"an error occurred",
            err,
        })
    })
})

router.get("/:quizId",(req,res)=>{
    Quiz.findByPk(req.params.quizId,{
        include:[User,Questions,Comment]
    }).then(quizdata=>{
        res.json(quizdata)
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
        Quiz.create({
            title: req.body.title,
            like: req.body.like,
            user_id: req.body.user_id,
        }).then(quizData=>{
            res.json(quizData)
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
        Quiz.findByPk(req.params.id).then(foundQuestions=>{
            if(!foundQuestions){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundQuestions.UserId!==userData.user_id){
                return res.status(403).json({
                    msg:"you dont own this Quiz!"
                })
            } else {
                Quiz.destroy({
                    where:{
                        quiz_id:req.params.id
                    }
                }).then(delQuestions=>{
                    res.json(delQuestions)
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
        Quiz.findByPk(req.params.id).then(foundQuestions=>{
            if(!foundQuestions){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundQuestions.UserId!==userData.user_id){
                return res.status(403).json({
                    msg:"you dont own this Quiz!"
                })
            } else {
                Quiz.update(
                    req.body,
                    {
                    where:{
                        id:req.params.user_id
                    }
                }).then(delQuestions=>{
                    res.json(delQuestions)
                })
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    }
})
router.put("/like/:id",(req,res)=>{
    try{
        console.log(req.params.id);
        Quiz.findByPk(req.params.id).then(foundQuestions=>{
            if(!foundQuestions){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else {
                Quiz.update(
                    req.body,
                    {
                    where:{
                        quiz_id:req.params.id
                    }
                }).then(updated=>{
                    res.json(updated)
                })
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"an error occured",err})
    }
})

module.exports = router;