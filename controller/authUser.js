const express = require('express');
const app = new express();
const bodyParser = require('body-parser')
const User = require('../models/users')
const Posts = require('../models/posts')
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt')
const bcrypt = require('bcryptjs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv/config')


exports.SignUp = async (req,res)=>{
    try{
        const user = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        password:req.body.password
    });
    const AlreadyUser = await User.findOne({"username":req.body.username})
    if(AlreadyUser.username === req.body.username){
        return res.status(400).json("Same username is already used. Try different")
    }
    else{
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    console.log("req.body",req.body)
    const result = user.save((err,success)=>{
        if(err){
          
            console.log("err ",err)
         
        }
        res.json(success)
    })}
    
}
    catch(err){
        console.log("err",err)
    }
}

exports.signin = async (req,res)=>{
    try{
        const validUser = await User.findOne({'username':req.body.username})

        if(!validUser){
            res.json("user not found")
        }

        const validPassword = await bcrypt.compare(req.body.password, validUser.password);
        if(!validPassword) return res.status(400).json("incorrect password")

        const token = jwt.sign({_id: validUser._id}, process.env.SECRET, {expiresIn: 86400})

        res.cookie("token", token,{expire: new Date() + 86400});

        const {_id, username, role} = validUser;

        req.user = validUser;
        console.log("token", token);
        console.log(req.user);
        return res.json({token,user:{_id,username}});
    }
    catch(err){
        console.log("err in signin",err)

    }
}

exports.signout = async (req,res)=>{
    res.clearCookie("token");
    res.json("user signed out successfully");
}

exports.isSignedIn =  expressjwt({
    algorithms: ['sha1', 'RS256', 'HS256'],
    secret : process.env.SECRET,
    userProperty:"auth"
})


exports.isAuthenticated =  (req,res,next)=>{
    console.log(req.auth);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) return res.status(403).json({
        error:( "Access Denied")
    })
    console.log("fff",req.auth)
    next();
}



exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err: err,
                error: "No user was found"
            });
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req,res)=>{
    req.profile.password = undefined;
    return res.json(req.profile);
}
