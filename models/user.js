const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
    //password
    //recipes they've liked
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User