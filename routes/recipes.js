const express = require('express')
const router = express.Router()

//Input models
const Recipe = require('../models/recipe')

//input links from controllers pages 
const showAllRecipes = require('../controllers/recipesController')

//-----Show all recipes
router.get('/', showAllRecipes)

module.exports = router