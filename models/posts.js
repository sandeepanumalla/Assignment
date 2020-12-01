const mongoose = require('mongoose')

const reqString = {
    type:String,
    required: true,
       
}

const postSchema = mongoose.Schema({
    post_name: reqString,
    user: reqString,
    user_id: reqString,
    text: reqString,
    comments:[{
        username:reqString,
        comment:reqString,
        replies:[{
            username:reqString,
            to: reqString,
            reply:reqString
        }]
    },{timestamps: true}]

},{timestamps:true})

module.exports= mongoose.model('Posts',postSchema);
