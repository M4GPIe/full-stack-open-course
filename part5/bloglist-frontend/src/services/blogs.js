import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setToken = (t)=>{token = `Bearer ${t}`}

export default { getAll, createBlog, setToken }