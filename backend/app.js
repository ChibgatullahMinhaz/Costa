require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Config/db');
const app = express()
const routes = require('./routes/projectRoutes')

connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 
app.use('/', routes)

module.exports = app;