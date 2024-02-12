import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async updatedBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const removeBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const setToken = (t)=>{token = `Bearer ${t}`}

export default { getAll, createBlog, setToken, updateBlog, removeBlog }