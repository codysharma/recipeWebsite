const mongoose = require('mongoose')
const Liked = require('./liked')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}, 
    password: String,
    recipesLiked: [{type: mongoose.Schema.Types.ObjectId, ref: "Liked"}]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User