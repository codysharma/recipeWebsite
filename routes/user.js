const express = require('express')
const router = express.Router()

//Input models
const User = require('../models/user')

//input links from controllers pages 
const {showAllUsers, getUserById, createUser, deleteUserById, updateUser} = require('../controllers/userController')

//----Routes
router.get('/display', showAllUsers)
router.get('/:id', getUserById)
router.post('/newuser', createUser)
router.delete('/edituser/:id', deleteUserById)
router.put('/edituser/:id', updateUser)


module.exports = router