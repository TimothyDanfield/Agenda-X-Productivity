const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Note = mongoose.model('Note', noteSchema)

module.exports = Note