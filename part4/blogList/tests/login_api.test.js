const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

//Jest function beforeEach runs before every test
beforeEach(async () => {
    //clear DB
    await User.deleteMany({})

    //add sample users
    const userObjects = helper.initialUsers
        .map(user => new User(user))
    let promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('login test collection',()=>{

    test('login gives correct token with correct userName and password', async()=>{
        let user = helper.initialUsers[0]
        let userLogin = {userName : user.userName, password : user.password}

        let response = await api   
            .post('/api/login')
            .send(userLogin)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unauthorized exception given when bad password', async()=>{
        let userLogin = {userName : "nonExistingUser", password : "badPassword"}

        let response = await api   
            .post('/api/login')
            .send(userLogin)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})




//Jest afterAll function runs after every test is finished
afterAll(async () => {
    //close mongoose connection
    await mongoose.connection.close()
})