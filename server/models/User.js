const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    securityQuestion: {
        type: String,
        required: true,
    },
    securityAnswer: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: ObjectId,
            ref: 'Task'
        }
    ],
    notes: [
        {
            type: ObjectId,
            ref: 'Note'
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User