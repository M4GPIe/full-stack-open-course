import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import AddBlogs from './components/AddBlogs'
import Notification from './components/notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({text:'',type:''})

  //fetch data from server
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b)=>b.likes-a.likes) )
    )  
  }, [blogs.length,blogs.reduce((s,b)=>s+b.likes,0)])   //any time you add or like a blog

  //check if there's an active sesion
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  //login function
  const login = async (credentials)=>{
    try{
      const user = await loginService.login(credentials)
      setUser(user)
      
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)

      setNotification({text:`Logged in as ${user.userName}`,type:'update'})
      setTimeout(() => {
        setNotification({text:'',type:''})
      }, 5000)
    }catch (error){
      setNotification({text:`Bad login credentials \n Error: ${error.response.data.error}`,type:'error'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
    }
  }

  //add blogs handler
  const createBlog = async(url,title)=>{
    try{
      const newBlog = {
        title : title,
        author : user.userName,
        url : url,
        likes : 0
      }

      const saved = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(saved))

      setNotification({text:`New blog added`,type:'success'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
    }catch (error){
      setNotification({text:`Something wrong happened :(\nError: ${error.response.data.error}`,type:'error'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
    }
  }

  //addLike
  const addLike = async(blog)=>{
    try{
      const updatedBlog = {...blog, likes: blog.likes+1}
      await blogService.updateBlog(updatedBlog)
      blog.likes++
      setNotification({text:`You liked "${blog.title}"`,type:'success'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
    }catch (error){
      setNotification({text:`Something wrong happened :(\nError: ${error.response.data.error}`,type:'error'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
    }
  }

  //removeBlog
  const deleteBlog = async(blog)=>{
    try{
      if(window.confirm(`Are you sure you want to delete ${blog.title}?`)){
        await blogService.removeBlog(blog.id)
        setBlogs(blogs.filter(b=>b.id!==blog.id))

        setNotification({text:`Deleted "${blog.title}"`,type:'success'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
      }
    }catch(error){
      console.log(error)
      setNotification({text:`Something wrong happened :(\nError: ${error.response.data.error}`,type:'error'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
    }
  }

  //logout handler
  const logout = ()=>{
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setNotification({text:`Logged out. Sesion closed`,type:'update'})
        setTimeout(() => {
          setNotification({text:'',type:''})
        }, 5000)
  }

  //conditional rendering
  if (user === null) {
    return (
      <div>
        <Notification message={notification.text} type={notification.type}/>
        <h2>Log in to application</h2>
        <LoginForm loginFunction = {login}/>
      </div>
    )
  }

  return (
    <div id='mainDiv'>
      <Notification message={notification.text} type={notification.type}/>
      <h1>BlogList</h1>
      <h3>User: {user.userName}</h3>
      <Togglable buttonLabel = {'Create new Blog'}>
        <h2>Create new Blog:</h2>
        <AddBlogs createBlog={createBlog}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>
      )}
      <Logout onClick={logout}/>
    </div>
  )
}


export default App