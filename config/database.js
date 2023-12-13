const mongoose = require('mongoose');
require('dotenv').config();

const conn = 'mongodb://localhost:27017/testdb';


const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Expose the connection
module.exports = connection;