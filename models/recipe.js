const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({

}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe