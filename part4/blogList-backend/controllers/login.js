require('dotenv').config()
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/',async (request, response)=>{
    const userName = request.body.userName
    const password = String(request.body.password)
    
    //find the user's object
    const user = await User.findOne({userName})

    //check password
    const correctPassword = user === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash)
    if(!(user&&correctPassword)){
        return response.status(401).json({error : 'Invalid username or password'})
    }

    //token
    const userForToken = {
        userName : user.userName,
        id : user._id
    }

    //sign the token
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, userName : user.userName, name : user.name })
})

module.exports = loginRouter