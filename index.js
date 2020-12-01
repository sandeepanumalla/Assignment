const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://Sandeep:Sandeep@cluster0.vybdl.mongodb.net/test',{useNewUrlParser: true,useUnifiedTopology: true})
.then(data => {
    console.log(`successfully connected to db`)
})
.catch(err => {
    console.log(`error connecting db`)
})
const userRoute = require('./routes/user')


app.use('/api/users/',userRoute);

/* app.get("/",(req,res)=>{
    res.send('hello')
}) */

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`app listening to ${port}`)
})