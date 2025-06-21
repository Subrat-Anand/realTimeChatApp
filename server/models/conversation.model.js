const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    partcipants:[
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, {timestamps: true})

const Conversation = mongoose.model("Conversation", conversationSchema)
module.exports = Conversation