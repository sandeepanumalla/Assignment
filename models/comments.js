const mongoose = require('mongoose');
const posts = require('./posts');
const Schema = mongoose.Schema;

const reqString = {
    type:String,
    required: true,
       
}

const nestedSchema= new Schema({
    username:reqString,
    user_id:reqString,
    content:{ type:String},
    comments:[this],
    postId:{type: mongoose.Schema.Types.ObjectId, ref:'Posts',required:true}
});



const nestedreplies = mongoose.model('comment',nestedSchema);
module.exports = nestedreplies;