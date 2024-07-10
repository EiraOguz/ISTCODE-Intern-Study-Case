const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../routes/userRoutes');
const authRoutes = require('../routes/authRoutes');
const sequelize = require('../config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads',express.static('uploads'));


sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = app;
