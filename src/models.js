const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        contact: {
            type: Object,
            default: {}
        },
        voice: {
            type: Object,
            default: {}
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
            enam: ['uz', 'ru', 'en']
        }
    },
    {timestamps: true}   
)

module.exports = mongoose.model('User', userSchema)