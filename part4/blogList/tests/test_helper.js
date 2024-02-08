//common functions used in different test situations
const Blog = require('../models/blog')
const User = require('../models/user')

/*
*the following author values contain the userName of the author as we need first to
*save the users in DB to know their generated id
*in blog_api.test we will first save the users and then replace the author with the
*proper id corresponding to that user
*/

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "PostmanDilema66",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "PostmanDilema66",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "RoCMar",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "RoCMar",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      title: "Type wars",
      author: "RoCMar",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }  
]

const initialUsers = [
  {
    userName: "Michael Chan",
    name: "Michael Chan Lee",
    password: 123456 
  },
  {
    userName: "PostmanDilema66",
    name: "Edsger W. Dijkstra",
    password: 654321 
  },
  {
    userName: "RoCMar",
    name: "Robert C. Martin",
    password: 111222 
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "This will be removed soon" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(user=>user.toJSON())
}

module.exports = {
  initialBlogs,initialUsers , nonExistingId, blogsInDb, usersInDb
}