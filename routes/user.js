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
const checkAuth = require('../middleware/checkauth')

//--------Routes
router.get('/display', showAllUsers)
router.get('/signup', sendNewUserForm)
router.get('/login', sendLogInForm)
router.get('/logout', logOut)
router.post('/login', logIn)
router.post('/signup', createUser)
router.get('/:id', getUserById)
router.use(checkAuth)
//authentication checkpoint
// router.get('/:id', getUserById)
router.delete('/edituser/:id', deleteUserById)
router.put('/edituser/:id', updateUser)


module.exports = router