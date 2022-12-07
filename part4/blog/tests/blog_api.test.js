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

test('likes default to 0 in case likes are missing', async () => {
  const BlogWithoutLikes = {
    _id: '99a88aa71b84a676234d17f9',
    title: 'Adding likes considered harmful',
    author: 'Dummy author',
    url: 'dummyurl',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(BlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // find blog from response array
  const createdBlog = response.body.find(
    (blog) => blog.id === BlogWithoutLikes._id
  )

  // Verify that the blog has 0 likes
  expect(createdBlog.likes).toBe(0)
})

test('it responds 400 with title or url is missing', async () => {
  const BlogWithoutTitle = {
    _id: '99a88aa71b84a676234d17f9',
    author: 'Dummy author',
    url: 'dummyurl',
    __v: 0
  }

  const BlogWithoutURL = {
    _id: '99a88aa71b84a676234d17f9',
    title: 'Adding likes considered harmful',
    author: 'Dummy author',
    __v: 0
  }

  await api.post('/api/blogs').send(BlogWithoutTitle).expect(400)
  await api.post('/api/blogs').send(BlogWithoutURL).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
