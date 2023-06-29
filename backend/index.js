const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();



// require db 
const { db } = require('./db/db');

// dotenv config
require('dotenv').config()


// PORT
const PORT = process.env.PORT




// middlewares

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);



// server

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`server started on ${PORT}`)
    })
}

server();