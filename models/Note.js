const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    createdAt: {
        type : Date,
        default: Date.now
    }
})

const Note = mongoose.model('Note', notesSchema)

module.exports = Note