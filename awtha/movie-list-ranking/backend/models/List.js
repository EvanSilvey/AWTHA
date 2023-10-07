const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        movies: [{
            type: mongoose.Schema.Types.Object,
            ref: 'Movies',
            default: null
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('List', ListSchema)