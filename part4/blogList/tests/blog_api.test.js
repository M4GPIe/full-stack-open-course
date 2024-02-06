const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const blog = require('../models/blog')

//Jest function beforeEach runs before every test
beforeEach(async () => {
    //clear DB
    await Blog.deleteMany({})

    //add sample blogs
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)

        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async ()=>{
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b=>b.title)

    expect(titles).toContain("Go To Statement Considered Harmful")
})

test('a specific blog can be viewed', async () => {
    //take a sample blog
    let blogs = await helper.blogsInDb()
    let blogToSee = blogs[0]

    let response = await api
        .get(`/api/blogs/${blogToSee.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toEqual(blogToSee)
})

test('a blog can be deleted', async () => {
    let blogs = await helper.blogsInDb()
    let blogToDelete = blogs[0]

    let response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    let blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(blogs.length-1)
    let titles = blogsAfterDelete.map(b=>b.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('a valid blog can be added', async () => {
    //new blog to be added
    const newBlog ={
        title: "Async/await is better than just promises",
        author: "Thomas Jefferson",
        url: "https://random/url",
        likes: 33
    }

    //adding the new blog, expecting success code and json response
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    //get all notes from DB
    let blogs = await helper.blogsInDb()

    //map just the titles
    const titles = blogs.map(b => b.title)
    //check if the new blog is actually added correctly
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
        'Async/await is better than just promises'
    )
})


//Jest afterAll function runs after every test is finished
afterAll(async () => {
    //close mongoose connection
    await mongoose.connection.close()
})