const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: false,
    },
    reminderTime: {
        type: String,
        required: false,
    }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task