const mongoose  = require('mongoose')

const reqString = {
    type:String,
    required: true,
        unique: true
}
const userSchema = new mongoose.Schema({

    username:reqString,
    fullname: reqString,
    password: reqString, 

}, {timestamps: true})

module.exports = mongoose.model('User',userSchema)

