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
    // author: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    rating: {type: Number, max: 5, min: 0}
}, {timestamps: true})

//prehooks - mongoose doesn't do arrow functions. No no.
recipeSchema.pre(["findOne", "find", "findById"], function(next){
    this.populate("author")
    next()
})

//creating instance method that allows us to only show/pull part of user model
recipeSchema.methods.censoredName = function(){
    return {
        title: this.title,
        equipment: this.equipment,
        instructions: this.instructions,
        requiredIngredients: this.requiredIngredients,
        optionalIngredients: this.optionalIngredients,
        spices: this.spices,
        difficlty: this.difficulty,
        author: this.author.nameOnly(),//using instance method from user.js model to pass non-sensitive info
        rating: this.rating
    }
}

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe

