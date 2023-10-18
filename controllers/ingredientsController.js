const Ingredient = require('../models/ingredient')

const ingredientById = async (req, res) =>{
    const individualIngredient = await Ingredient.findById(req.params.id)
    res.json({
        "ingredient list": individualIngredient,
        "status": 203
    })
    
    // console.log(user);
    // res.render("/", {individualIngredientList})
}

const allIngredients = async (req, res) => {
    const ingredientsListTotal = await Ingredient.find()
    res.json({
        "Ingredients": ingredientsListTotal,
        "status": 200
    })
}

const createIngredient = async (req, res) => {
        const newIngredient = await Ingredient.create({
        name: req.body.name,
        image: req.body.image
    })
    res.json({
        "New ingredient": newIngredient
    })
}

const deleteIngredientById = async (req, res) => {
    await Ingredient.findByIdAndDelete({_id: req.params.id})
    res.json({
        "message": "Successfully deleted"
    })
}

module.exports = {
    ingredientById, 
    allIngredients,
    createIngredient,
    deleteIngredientById
}