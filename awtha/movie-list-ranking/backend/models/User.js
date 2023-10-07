const mongoose = require('mongoose')
const jsontoken = require('jsonwebtoken')
const env = require("dotenv").config().parsed

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jsontoken.sign({_id: this._id}, process.env.PRIVATETOKENKEY, {expiresIn: "7d"})
    return token
}

module.exports = mongoose.model('User', userSchema)