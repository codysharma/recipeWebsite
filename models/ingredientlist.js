const mongoose = require('mongoose')

const ingredientListSchema = new mongoose.Schema({
    requiredIngredients: {type: Array, "default": [], required: true},
    optionalIngredients: {type: Array, "default": []}
}, {timestamps: true})

const IngredientList = mongoose.model('IngredientList', ingredientListSchema)
module.exports = IngredientList