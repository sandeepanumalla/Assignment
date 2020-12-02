const Posts = require('../models/posts');
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const nestedreplies = require('../models/comments');


exports.createPosts = async (req,res)=>{
    try{const post = new Posts(req.body)
        post.user = req.profile.username;
        post.user_id = req.profile._id;
    console.log(req.body)
    console.log(req.profile)
    post.ma
    const result = post.save((err,success)=>{
        if(err){
            console.log("error pushing the posts",err)
        }
        else{
            res.status(200).json(success)
        }
    })

}
    catch(err){
        console.log("error posting the post", err)
    }
}

exports.getPostById =(req,res,next,id)=>{
    console.log("id",id);
    Posts.findOne({_id: id}).exec((err,success)=>{
        if(err || !success){
            res.json("Either post has been deleted")
        }
        console.log("req.postss",success)
         req.post = success;
        next();
    })
}





