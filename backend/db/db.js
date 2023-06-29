const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.mongo_URL)
        console.log("db connected");
    } catch (error) {
        console.log('database connection error')
    }
}

module.exports = { db };