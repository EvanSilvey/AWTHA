const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Movie', MovieSchema)