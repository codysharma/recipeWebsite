const express = require('express')
const router = express.Router()

//Input models
const Recipe = require('../models/recipe')

//input links from controllers pages 
const {showAllRecipes, getRecipeById, createRecipe, deleteRecipeById, updateRecipe} = require('../controllers/recipesController')

//-----Routes
router.get('/display', showAllRecipes)
router.get('/:id', getRecipeById)
router.post('/newrecipe', createRecipe)
router.delete('/editrecipe/:id', deleteRecipeById)
router.put('/editrecipe/:id', updateRecipe)

module.exports = router