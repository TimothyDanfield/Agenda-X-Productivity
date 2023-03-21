const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const googleUserSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: "googleUser"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
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

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema)

module.exports = GoogleUser