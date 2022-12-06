const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blog entries are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('2 blog posts are returned', async () => {
  const response = await api.get('/api/blogs')
  //expect(response.body).toHaveLength(helper.initialBlogs.length)
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('blog entries have id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = helper.extraBlog

  console.log(newBlog)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const contents = blogsAtEnd.map((blog) => blog.title)
  expect(contents).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
