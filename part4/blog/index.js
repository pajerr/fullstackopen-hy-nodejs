const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

//these are to be moved to the app
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

require('dotenv').config()
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
