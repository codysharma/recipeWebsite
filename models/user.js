const mongoose = require('mongoose')
const Liked = require('./liked')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}, 
    password: String,
    recipesLiked: [{type: mongoose.Schema.Types.ObjectId, ref: "Liked"}]
}, {timestamps: true})

//prehook
userSchema.methods.nameOnly = function(){
    return {
        name: this.name,
        id: this._id
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User