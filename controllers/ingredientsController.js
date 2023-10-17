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

module.exports = {
    ingredientListById, 
}