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
router.post('/login', logIn)
router.get('/recipes/:id', getRecipesByUserId)
router.get('/logout', logOut)
router.post('/signup', createUser)
router.get('/myaccount', getUserById)
//Trying to add a "liked list" tied to each user account
// router.post('/myaccount', (req, res) => {
//     const recipeId = req.body.recipeId
//     User.findByIdAndUpdate(
//         req.user.id,
//         { $addToSet: { recipesLiked: recipeId } }, // $addToSet will only add the movieId if it's not already in the favorites array
//         { new: true }, // This option returns the modified document
//         (err, updatedUser) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send({ error: 'Server error' });
//             } else {
//                 res.send({ success: true, updatedUser });
//             }}
//     )
// })
router.use(checkAuth)
//authentication checkpoint
// router.get('/:id', getUserById)
router.delete('/edituser/:id', deleteUserById)
router.get('/edituser/:id', sendUpdateUserForm)
router.put('/edituser/:id', updateUser)


module.exports = router