const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task