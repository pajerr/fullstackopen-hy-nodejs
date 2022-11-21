const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

// MONGODB connection stuff
require('dotenv').config()
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
