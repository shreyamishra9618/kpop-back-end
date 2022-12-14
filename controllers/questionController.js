const express = require('express');
const router = express.Router();
const {User,Questions, Quiz} = require('../models');
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    Questions.findAll().then(QuestionsData=>{
        res.json(QuestionsData)
    }).catch(err=>{
        console.log(err);
        res.json({
            msg:"an error occurred",
            err,
        })
    })
})
router.get("/:id",(req,res)=>{
    Questions.findByPk(req.params.id,{
        include:[User,Quiz]
    }).then(QuestionsData=>{
        res.json(QuestionsData)
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
        Questions.create({
            // Questions_id:req.body.Questions_id,
            picture:req.body.picture,
            question_content:req.body.question_content,
            option1:req.body.option1,
            option2:req.body.option2,
            option3:req.body.option3,
            option4:req.body.option4,
            correct_ans:req.body.correct_ans,
            // user_id:req.body.user_id,
            quiz_id:req.body.quiz_id,
            user_id:userData.user_id

        }).then(QuestionsData=>{
            res.json(QuestionsData)
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
        Questions.findByPk(req.params.Questions_id).then(foundQuestions=>{
            if(!foundQuestions){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundQuestions.UserId!==userData.id){
                return res.status(403).json({
                    msg:"you dont own this Questions!"
                })
            } else {
                Questions.destroy({
                    where:{
                        id:req.params.Questions_id
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
        Questions.findByPk(req.params.Questions_id).then(foundQuestions=>{
            if(!foundQuestions){
                return res.status(404).json({
                    msg:"no such item exists!"
                })
            } else if(foundQuestions.Questions_id!==userData.Questions_id){
                return res.status(403).json({
                    msg:"you dont own this Questions!"
                })
            } else {
                Questions.update(
                    req.body,
                    {
                    where:{
                        id:req.params.Questions_id
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

module.exports = router;