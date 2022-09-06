const express = require('express');
const app = express();
const cors = require('cors');
const connectMongoBD = require('./config/db');
const PORT = process.env.PORT || 8080;

// conncet db
connectMongoBD();

// Middleware init  - now express comes with build in MW
// app.use(bodyParser.json())   X
app.use(
    express.json({
        extended: false,
    })
);
app.use(cors());

//
app.get('/', (req, res) => {
    res.send('Api Runinng');
});

// define routes
// pretent to user file , i.e /api/user =~ /
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
