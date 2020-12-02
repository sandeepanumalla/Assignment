const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const nestedreplies = require('../models/comments');
const User = require('../models/users')
const Posts = require('../models/posts')


exports.reply= (req,res)=>{

    const commentId = req.params.commentId;
    console.log("commentId",commentId)
    res.send(commentId)

    Posts.findById(req.post._id).then((success)=>{
        const findComment = (id,comments)=>{
            if(comments.length > 0){
                for(var i=0;i<comments.length;i++){
                    const comment = comments[i];
                    if(comment._id == id){
                        console.log("--->>>found",comment)
                        return comment
                    }
                    const nestedComment = findComment(id,comment.comments);
                        if(nestedComment){
                            return nestedComment;
                        }
                    }
                
            }
        }

        const comment = findComment(commentId,success.comments);
        console.log("ccomments",comment)

        const newComment = new nestedreplies({
            username: req.profile.username,
            user_id:req.profile._id,
            content: req.body.content,
            comments:[],
            postId:req.post._id
        })
        console.log("step 2");
        console.log(req.body.content);
        console.log("step 2");

        comment.comments.unshift(newComment);
        success.markModified('comments');
        return success.save((err,success)=>{
            if(err){
                console.log("err adding new reply ",err)
            }
            console.log("success",success)
        });

    }).then((success)=>{
        console.log("step 2 successful");
        // console.log(success);
    }).catch((err)=>{
        console.log("err in saving post",err)
    })

}