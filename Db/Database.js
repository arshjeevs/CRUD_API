const mongoose = require('mongoose');

mongoose.connect("********")

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = {User};