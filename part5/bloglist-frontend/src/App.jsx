import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import AddBlogs from './components/AddBlogs'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [notification, setNotification] = useState({text:'',type:''})

  //fetch data from server
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //check if there's an active sesion
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //login form handlers
  const login = async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({userName, password})
      
      setUser(user)
      setUserName('')
      setPassword('')
      
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

  const handleUserNameChange = ({target})=>setUserName(target.value)

  const handlePasswordChange = ({target})=>setPassword(target.value)

  //add blogs handler
  const handleUrlChange = ({target})=>setUrl(target.value)

  const handleTitleChange = ({target})=>setTitle(target.value)

  const createBlog = async(event)=>{
    event.preventDefault()
    try{
      const newBlog = {
        title : title,
        author : user.userName,
        url : url,
        likes : 0
      }

      const saved = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(saved))
      setUrl('')
      setTitle('')

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
        <LoginForm userName={userName} handleUserNameChange={handleUserNameChange} password={password} handlePasswordChange={handlePasswordChange} onSubmit={login}/>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification.text} type={notification.type}/>
      <h2>User: {user.userName}</h2>
      <AddBlogs title={title} handleTitleChange={handleTitleChange} url = {url} handleUrlChange={handleUrlChange} onSubmit={createBlog}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Logout onClick={logout}/>
    </div>
  )
}


export default App