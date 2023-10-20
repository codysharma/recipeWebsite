const express = require('express')
const router = express.Router()

//Input models
const Recipe = require('../models/recipe')

//input links from controllers pages 
const {
    showAllRecipes, 
    getRecipeById, 
    createRecipe, 
    deleteRecipeById, 
    updateRecipe,
    sendNewRecipeForm
} = require('../controllers/recipesController')
const checkAuth = require('../middleware/checkauth')

//-----Routes
router.get('/display', showAllRecipes)
router.get('/:id', getRecipeById)
//Authorization checkpoint
router.use(checkAuth)
router.get('/newrecipe', sendNewRecipeForm)
router.post('/newrecipe', createRecipe)
router.delete('/editrecipe/:id', deleteRecipeById)
router.put('/editrecipe/:id', updateRecipe)

module.exports = router