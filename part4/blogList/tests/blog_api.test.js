const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const utils = require('../utils/list_helper')
let i = 0

//ni idea de como hacer que no pete :((

beforeEach(async () => {
    console.log('iteracion: ',++i)
    //clear blogs
    await Blog.deleteMany({})
    //clear users
    await User.deleteMany({})

    //add sample users
    const userObjects = helper.initialUsers
        .map(user => new User(user))
    let promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)

    //add sample users
    const blogObjects = helper.initialBlogs
        .map(blog => {
            let authorUser = userObjects.find(u=>u.userName == blog.author)
            let authorId = authorUser._id
            return new Blog({
                ...blog,
                author : authorId
            })
        })

    promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('blog router test collection', ()=>{

    test('all blogs can be retrieved', async()=>{
        let response = await api  
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        let blogs = response.body
        //all blogs are retrieved correctly
        expect(blogs).toHaveLength(helper.initialBlogs.length)

        //a random blog is within the retrieved
        let title = helper.initialBlogs[utils.generateRandomIndex(helper.initialBlogs.length)].title
        expect(blogs.map(b=>b.title)).toContain(title)
    })

    test('can\'t create a blog without login in', async()=>{

    })

    test('can\'t delete a blog if you\'re not the owner', async()=>{

    })

    test('can create a blog with the proper authorization', async()=>{

    })
})

//Jest afterAll function runs after every test is finished
afterAll(async () => {
    //close mongoose connection
    await mongoose.connection.close()
})