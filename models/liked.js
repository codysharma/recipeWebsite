const mongoose = require('mongoose')

const likedSchema = new mongoose.Schema({
    recipeId: String 
}, {timestamps: true})

const Liked = mongoose.model('Liked', likedSchema)
module.exports = Liked