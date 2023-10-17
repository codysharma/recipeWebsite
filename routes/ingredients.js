const express = require('express')
const router = express.Router()

//Input models
const IngredientList = require('../models/ingredientlist')

//input links from controllers pages 
const {individualIngredientList} = require('../controllers/ingredientsController')

//-----Show individual ingredient list by ID
router.get('/:id', individualIngredientList)

module.exports = router