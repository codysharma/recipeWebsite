const mongoose = require('mongoose')

const instructionListSchema = new mongoose.Schema({

}, {timestamps: true})

const InstructionList = mongoose.model('InstructionList', instructionListSchema)
module.exports = InstructionList