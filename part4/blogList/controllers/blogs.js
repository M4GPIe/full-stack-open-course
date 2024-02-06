const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//route handling
//rejected promises will be handled by express-async-errors
blogsRouter.get('/', async (request, response) => {
    let blogs = await Blog.find({})
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
    const blog = new Blog(request.body)

    let saved = await blog.save()
    response.status(201).json(saved)
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