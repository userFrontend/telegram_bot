const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true
        },
        right: {
            type: Number,
            default: 0
        },
        wrong: {
            type: Number,
            default: 0
        },
        lang: {
            type: String,
            default: 'uz',
            enam: ['uz', 'ru', 'eng']
        }
    },
    {timestamps: true}   
)

module.exports = mongoose.model('User', userSchema)