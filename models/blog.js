const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        requied:true
    }
},{timestamps:true})

const Blog=mongoose.model('Blog',blogSchema)//it will pluralise it and look for blogs

module.exports = Blog;