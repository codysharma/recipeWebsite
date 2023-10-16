const mongoose = require('mongoose')

const ingredientListSchema = new mongoose.Schema({

}, {timestamps: true})

const IngredientList = mongoose.model('IngredientList', ingredientListSchema)
module.exports = IngredientList