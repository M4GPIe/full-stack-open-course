import { useState } from "react"

const Blog = ({ blog, addLike, deleteBlog }) => {

  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpand = ()=>{setExpand(!expand)}

  const likeOnClick = (event)=>{
    event.preventDefault()
    addLike(blog)
  }

  const deleteOnClick = (event)=>{
    event.preventDefault()
    deleteBlog(blog)
  }

  if(!expand){
    return(
      <div style={blogStyle}>
      <h3>{blog.title} - {blog.author.userName}</h3>
      <button onClick={toggleExpand}>See more info</button>
      </div>  
    )
  }

  return(
    <div style={blogStyle}>
        <h3>{blog.title}</h3>
        <p>
          Author: {blog.author.userName}
          <br/>
          URL: {blog.url}
        </p>
        <div>
          Likes: {blog.likes}
          <button onClick={likeOnClick}>Like</button>
        </div>
        <button onClick={deleteOnClick}>Delete</button>
        <button onClick={toggleExpand}>Hide details</button>
    </div>  
  )
}

export default Blog