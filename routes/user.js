const express = require("express");
const { SignUp, signin, signout, isSignedIn, isAuthenticated, getUser, getUserById } = require("../controller/authUser");
const User = require('../models/users')
const router =  express.Router();
const bodyParser = require('body-parser');
const { createPosts, getPostById } = require("../controller/posts");
const { response } = require("express");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.param('userId',getUserById);
router.param('postId',getPostById);

router.get('',(req,res)=>{
    res.send("hello ji")
    console.log(req.body)
})

router.post('/signup',SignUp);
router.post('/signin',signin)
router.post('/signout',signout);
/* router.get('/signedin',isSignedIn,(req,res)=>{
    res.json(req.auth);
}) */

router.get('/getuser/:userId',isSignedIn,isAuthenticated,getUser);
router.post('/new-post/:userId',isSignedIn,isAuthenticated,createPosts);
router.post('/new-comment/:userId/:postId',isSignedIn,isAuthenticated,getPostById,);

module.exports = router;