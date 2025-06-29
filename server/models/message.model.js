const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type: String,
        default: null
    },
    image:{
        type: String,
        default: null
    }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema)
module.exports = Message