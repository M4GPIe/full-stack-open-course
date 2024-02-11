const Blog = ({ blog }) => {
  return(
    <div>
    {blog.title} - {blog.author.userName}
    </div>  
  )
}

export default Blog