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
    logOut
} = require('../controllers/userController')

//--------Routes
router.get('/display', showAllUsers)
router.get('/:id', getUserById)
router.get('/new', sendNewUserForm)
router.get('/login', sendLogInForm)
router.get('/logout', logOut)
//authentication checkpoint
router.post('/login', logIn)
router.post('/newuser', createUser)
router.delete('/edituser/:id', deleteUserById)
router.put('/edituser/:id', updateUser)


module.exports = router