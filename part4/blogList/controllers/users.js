const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async(request, response)=>{
    const body = request.body

    const password = body.password

    //password validation 
    if(!password||password.length<3){return response.status(400).end()}

    //password hashing
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(String(password),saltRounds)

    const user = new User({
        userName : body.userName,
        name : body.name,
        passwordHash
    })

    const saved = await user.save()
    response.status(201).json(saved)
})

userRouter.get('/', async(request,response)=>{
    //make a pupulate (mongoose join) with notes and retrieve only their title, url and likes
    const users = await User.find({}).populate('blogs',{title:1,url:1,likes:1} )
    response.json(users)
})

module.exports = userRouter