const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    equipment: {type: Array, "default": [], required: true},
    instructions: {type: Array, "default": [], required: true},
    requiredIngredients: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"}],
    optionalIngredients: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"}],
    spices: [[{type: mongoose.Schema.Types.ObjectId, ref: "Spice"}]]
    //image
    //difficulty
    //creator - link to user model
    //rating
}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe