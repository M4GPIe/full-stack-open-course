require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//route handling
//rejected promises will be handled by express-async-errors
blogsRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('author',{userName:1} )
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

    //the user is extracted by the extractToken middleware, that decodes the token (if given) and extracts the user
    const body = request.body
    const requestUser = request.user

    if(!requestUser){
        return response.status(401).json({ error: 'invalid authorization' })
    }
    /*Create the new Blog */

    //find the user's object in DB
    const user = await User.findOne({userName : requestUser})

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

    //user extracted from decoded token in tokenExtractor middleware
    const requestUser = request.user

    //if no token was given, invalid authorization
    if(!requestUser){
        return response.status(401).json({ error: 'invalid authorization' })
    }

    //check if the token given matches the blog's owner
    const blog = await Blog.findOne({_id : request.params.id})
    const user = await User.findOne({userName : requestUser}) 

    if (user._id.toString() !== blog.author.toString()) {
        return response.status(401).json({ error: 'user is not the owner of this blog' })
    }

    //delete blog
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request,response)=>{
    let newBlog = new Blog(request.body)
    
    let updated = {
        title : newBlog.title,
        author : newBlog.author,
        likes : newBlog.likes,
        url : newBlog.url
    }

    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id,updated,{new:true, runValidators : true, context : 'query'})
    if(updatedBlog){
        response.json(updatedBlog)
    }else{
        response.status(404).end
    }
})

module.exports = blogsRouter