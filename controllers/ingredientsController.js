const IngredientList = require('../models/ingredientlist')

const ingredientListById = async (req, res) =>{
    const individualIngredientList = await IngredientList.findById(req.params.id)
    res.json({
        "ingredient list": individualIngredientList,
        "status": 203
    })
    
    // console.log(user);
    // res.render("/", {individualIngredientList})
}

const allIngredientLists = async (req, res) => {
    const ingredientsListTotal = await IngredientList.find()
    res.json({
        "Ingredient Lists": ingredientsListTotal,
        "status": 200
    })
}

module.exports = {
    ingredientListById, 
    allIngredientLists
}