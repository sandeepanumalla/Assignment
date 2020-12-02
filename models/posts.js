const mongoose = require('mongoose');
const nestedreplies = require('./comments');


const reqString = {
    type:String,
    required: true,
       
}


const postSchema = mongoose.Schema({
    post_name: reqString,
    user: reqString,
    user_id: reqString,
    text: reqString,
    comments:[nestedreplies.schema]

},{timestamps:true})

module.exports= mongoose.model('Posts',postSchema);
