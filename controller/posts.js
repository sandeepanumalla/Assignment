const Posts = require('../models/posts');
const express = require('express');
const app = new express();
const bodyParser = require('body-parser')


exports.createPosts = async (req,res)=>{
    try{const post = new Posts(req.body)
        post.user = req.profile.username;
        post.user_id = req.profile._id;
    console.log(req.body)
    console.log(req.profile)
    
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
    Posts.findById({_id: id}).exec((err,success)=>{
        if(err || !success){
            res.json("Either post has been deleted")
        }
        return res.posts = success;
        next();
    })
}