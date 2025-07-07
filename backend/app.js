require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Config/db');
const router = require('./Routes/projectRoutes');
const app = express()

connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 
app.use('/', router)

module.exports = app;