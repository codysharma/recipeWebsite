const Recipe = require('../models/recipe')

const showAllRecipes = async (req, res) => {
    const allRecipes = await Recipe.find()
    res.json({
        "Recipes Lists": allRecipes,
        "status": 200
    })
}

module.exports = showAllRecipes