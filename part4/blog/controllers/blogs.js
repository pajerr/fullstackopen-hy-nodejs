const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  //promise version replaced by async & await
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  //respond with 400 if title or url is missing
  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }

  const result = await blog.save()

  response.status(201).json(result)
})

module.exports = blogsRouter
