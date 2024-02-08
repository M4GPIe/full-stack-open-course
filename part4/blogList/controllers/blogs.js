require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getRequestToken = (request)=>{
    //authorization header
    const authorization = request.get('authorization')
    if(authorization&&authorization.startsWith('Bearer')){
        //return only the token without the bearer tag
        return authorization.replace('Bearer ', '')
    }else{
        return null
    }
}
//route handling
//rejected promises will be handled by express-async-errors
blogsRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('author',{userName:1,name:1,_id:1} )
    response.json(blogs)
})

blogsRouter.get('/:id', async (request,response)=>{
    let blog = await Blog.findById(request.params.id)

    if(blog){
        response.json(blog)
    }else{
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {

    /*Check if the request is authorized with the proper token*/
    const body = request.body
    const token = getRequestToken(request)
    
    //get and decode the token, if it's an invalid token a JsonWebTokenError will be launched
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!(decodedToken && decodedToken.id)) {//check if the token has been decoded correctly
        return response.status(401).json({ error: 'token invalid' })
    }

    /*Create the new Blog */

    //find the user's object in DB
    const user = await User.findOne({userName :decodedToken.userName})

    const blog = new Blog({
        title : body.title,
        author : user._id,
        url : body.url,
        likes : body.likes
    })

    //save new note
    const saved = await blog.save()

    //update user's note list
    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    response.status(201).json(blog)
})

blogsRouter.delete('/:id', async(request,response)=>{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request,response)=>{
    let newBlog = new Blog(request.body)
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id,newBlog,{new:true, runValidators : true, context : 'query'})
    if(updatedBlog){
        response.json(updatedBlog)
    }else{
        response.status(404).end
    }
})

module.exports = blogsRouter