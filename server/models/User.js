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
    tasks: [
        {
            type: ObjectId,
            ref: 'Task'
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User