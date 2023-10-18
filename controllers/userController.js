const User = require('../models/user')

const showAllUsers = async (req, res, next) => {
    try {
    const allUsers = await User.find()
    res.json({
        "All Users": allUsers,
        "status": 210
    })
    }
    catch (error){
        next(error)
    }
}

const getUserById = async (req, res, next) =>{
    const individualUser = await User.findById(req.params.id)
    res.json({
        "User Info": individualUser,
        "status": 214
    })
}

const createUser = async (req, res, next) => {
    try {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        recipesLiked: req.body.recipesLiked
        })
    res.json({
        "New recipe": newUser,
        "status": 211
    })
    }
    catch (error){
        next(error)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
    await User.findByIdAndDelete({_id: req.params.id})
    res.json({
        "message": "User successfully deleted"
    })
    }
    catch (error){
        next(error)
    }
}

const updateUser =  async(req,res, next) => {
    try {
        const filter = {_id: req.params.id}
        const newData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            recipesLiked: req.body.recipesLiked
            }
        const updatedUser = await User.findOneAndUpdate(filter, newData, {new:true})
        res.json({
            "Updated Recipe": updatedUser,
            "status": 212
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    showAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUser
}