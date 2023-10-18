const express = require('express')
const router = express.Router()

//Input models
const Ingredient = require('../models/ingredient')

//input links from controllers pages 
const {ingredientById, allIngredients, createIngredient, deleteIngredientById} = require('../controllers/ingredientsController')

//-----Show individual ingredient list by ID
router.get('/', allIngredients)
router.post('/', createIngredient)
router.delete('/:id', deleteIngredientById)
// router.get('/:id', ingredientListById)

module.exports = router