const express = require('express')
const router = express.Router()

//Input models
const User = require('../models/user')

//input links from controllers pages 
const {
    showAllUsers, 
    getUserById, 
    sendNewUserForm,
    createUser, 
    deleteUserById, 
    updateUser,
    sendLogInForm,
    logIn,
    logOut,
    sendUpdateUserForm,
} = require('../controllers/userController')
const checkAuth = require('../middleware/checkauth')
const { getRecipesByUserId } = require('../controllers/recipesController')

//--------Routes
router.get('/display', showAllUsers)
router.get('/signup', sendNewUserForm)
router.get('/login', sendLogInForm)
router.get('/recipes/:id', getRecipesByUserId)
router.get('/:id', getUserById)
router.use(checkAuth)
//authentication checkpoint
// router.get('/:id', getUserById)
router.post('/login', logIn)
router.post('/signup', createUser)
router.delete('/edituser/:id', deleteUserById)
router.get('/edituser/:id', sendUpdateUserForm)
router.put('/edituser/:id', updateUser)
router.get('/logout', logOut)

module.exports = router