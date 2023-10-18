const mongoose = require('mongoose')

const spiceSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}
    //Othey values?
}, {timestamps: true})

const Spice = mongoose.model('Spice', spiceSchema)
module.exports = Spice

//then populate the collection with lots of ingredients