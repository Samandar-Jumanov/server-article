const mongoose = require('mongoose')

const ArticlesSchema = mongoose.Schema({
    title:{type:String , required:true}, 
    theme:{type:String , required:true}
})

const ArticlesModel = mongoose.model('articles', ArticlesSchema)
module.exports = ArticlesModel