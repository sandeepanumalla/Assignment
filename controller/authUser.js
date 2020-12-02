const express = require('express');
const app = new express();
const bodyParser = require('body-parser')
const User = require('../models/users')
const Posts = require('../models/posts')
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt')
const bcrypt = require('bcryptjs');
const nestedreplies = require('../models/comments');
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
    
     const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log("req.body",user);
    const result = await user.save((err,success)=>{
        if(err.name === 'MongoError' || err.code === '11000' ){
      
           return res.json("username has already taken. try different one.")
        }
        res.json(success);
    })
    
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
