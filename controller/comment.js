const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const nestedreplies = require('../models/comments');
const User = require('../models/users')
const Posts = require('../models/posts')

exports.comment = (req,res)=>{
    console.log("req.posts",req.post)
    const info = [];

    info['username'] = req.profile.username;
    info['user_id'] = req.profile._id;
    info['content'] = req.body.content;
    /* comment['replies'] = []; */

    const username = info['username'];
    const content = info['content'];
    const user_id = info['user_id'];
    console.log("all ",username,content,user_id);
 
    Posts.findOneAndUpdate({_id: req.post._id},{$push:{
        "comments":{username:username,user_id:user_id,content: content,comments:[],postId:req.post._id}
    }}).exec((err,success)=>{
        if(err){
            res.json("error adding comment")
        }
        res.json("new comment add successfully");

    })
}

exports.deleteComment=(req,res)=>{
    Posts.findById( req.post._id).then((err,success)=>{
        if(err){
            console.log("post not found")
        }
        const findComment = (id,comment)=>{
            for(var i=0;i<comment.length;i++){
                const comments = comment[i];
                if(comments._id == comment){
                    return comments
                }
                const nestedComment = findComment(id,comments.comment)
                if(nestedComment){
                    return nestedComment
                }                
            }

        }

        const comment = findComment(req.params.commentId,success.comments)
        
        
    })
}
