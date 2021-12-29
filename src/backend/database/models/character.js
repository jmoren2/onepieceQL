const mongoose = require('mongoose')

const characterModel = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    link:{
        type:String,
        required: false
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('characters', characterModel)