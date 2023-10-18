const Recipe = require('../models/recipe')

const showAllRecipes = async (req, res, next) => {
    try {
    const allRecipes = await Recipe.find()
    res.json({
        "Recipes Lists": allRecipes,
        "status": 200
    })
    //Needs to become res.render("filename")
    }
    catch (error){
        next(error)
    }
}

const getRecipeById = async (req, res, next) =>{
    const individualRecipe = await Recipe.findById(req.params.id)
    res.json({
        "Recipe": individualRecipe,
        "status": 208
    })
    //Need to make display look good
}

const createRecipe = async (req, res, next) => {
    try {
    const newRecipe = await Recipe.create( {
        title: req.body.title,
        equipment: req.body.equipment,
        instructions: req.body.instructions,
        requiredIngredients: req.body.requiredIngredients,
        optionalIngredients: req.body.optionalIngredients,
        spices: req.body.spices,
        //image
        difficulty: req.body.difficulty,
        author: req.body.author,
        rating: req.body.rating
    })
    res.json({
        "New recipe": newRecipe,
        "status": 206
    })
    }
    catch (error){
        next(error)
    }
}

const deleteRecipeById = async (req, res, next) => {
    try {
    await Recipe.findByIdAndDelete({_id: req.params.id})
    res.json({
        "message": "Recipe successfully deleted"
    })
    }
    catch (error){
        next(error)
    }
}

const updateRecipe =  async(req,res, next) => {
    try {
        const filter = {_id: req.params.id}
        const newData =  {
            title: req.body.title,
            equipment: req.body.equipment,
            instructions: req.body.instructions,
            requiredIngredients: req.body.requiredIngredients,
            optionalIngredients: req.body.optionalIngredients,
            spices: req.body.spices,
            //image
            difficulty: req.body.difficulty,
            author: req.body.author,
            rating: req.body.rating
        }
        const updatedRecipe = await Recipe.findOneAndUpdate(filter, newData, {new:true})
        res.json({
            "Updated Recipe": updatedRecipe,
            "status": 207
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    showAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipeById,
    updateRecipe
}