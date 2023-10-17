const express = require('express')
const router = express.Router()

//Input models
const IngredientList = require('../models/ingredientlist')

//input links from controllers pages 
const {ingredientListById, allIngredientLists} = require('../controllers/ingredientsController')

//-----Show individual ingredient list by ID
router.get('/', allIngredientLists)
// router.get('/:id', ingredientListById)

module.exports = router