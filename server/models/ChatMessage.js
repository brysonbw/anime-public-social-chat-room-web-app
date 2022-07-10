const mongoose = require('mongoose');
const ChatMessageSchema = new mongoose.Schema({
    image: {
    type: String,
    required: true 
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
   
    createdAt: {
        type: Date, 
    // message auto deletes (expires) from createdAt
        expires: '12h', 
        default: Date.now
    }
    },
)

const ChatMessage = mongoose.model('chat_messages', ChatMessageSchema);
module.exports = ChatMessage;