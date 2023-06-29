const mongoose = require('mongoose');



//  Here i Define a user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher']
    },
    school: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;