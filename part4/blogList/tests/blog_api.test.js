const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

//Jest function beforeEach runs before every test
beforeEach(async () => {
    //clear DB
    await Blog.deleteMany({})
    await User.deleteMany({})

    //add sample users
    const userObjects = helper.initialUsers
        .map(user => new User(user))
    let promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
    
})

describe('user administration test collection',()=>{

    test('users can be retrieved', async()=>{

        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        //all users are retrieved
        expect(response.body).toHaveLength(helper.initialUsers.length)
        //a random user is within the retrieved
        const userNames = response.body.map(user=>user.userName)
        expect(userNames).toContain(helper.initialUsers[0].userName)
    })

    test('a valid user can be added',async()=>{

        const newUser = {
            userName : "newBy33",
            name : "Jeorge Ramirez",
            password : 12341
        }

        await api   
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const users = await helper.usersInDb()

        //new user is saved correctly
        expect(users).toHaveLength(helper.initialUsers.length+1)
        expect(users.map(u=>u.userName)).toContain(newUser.userName)
    })

    test('user with missing userName can\'t be added',async()=>{

        const newUser = {
            userName : "",
            name : "James Webb",
            password : 123123
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        //no user is added
        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })

    test('user without minimum length can\'t be added', async()=>{
        const newUser = {
            userName : "JJAb123",
            name : "JJAbrahams",
            password : "a"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        //no user is added
        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })
})


//Jest afterAll function runs after every test is finished
afterAll(async () => {
    //close mongoose connection
    await mongoose.connection.close()
})