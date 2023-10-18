const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: String
}, {timestamps: true})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)
module.exports = Ingredient

//then populate the collection with lots of ingredients