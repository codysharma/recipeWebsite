const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    equipment: {type: Array, "default": [], required: true},
    instructions: {type: Array, "default": [], required: true},
    // requiredIngredients: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"}],
    // optionalIngredients: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"}],
    // spices: [{type: mongoose.Schema.Types.ObjectId, ref: "Spice"}]
    //If using this data structure, when pushing a new recipe, the ingredients/spices are written as an [id#, id#, etc.]
    requiredIngredients: {type: Array, "default": [], required: true},
    optionalIngredients: {type: Array, "default": []},
    spices: {type: Array, "default": []},
    //image
    difficulty: {type: Number, max: 5, min: 0},
    author: String,
    rating: {type: Number, max: 5, min: 0}
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe

