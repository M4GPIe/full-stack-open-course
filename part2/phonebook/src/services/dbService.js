import axios from "axios"
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = ()=>{
    //request using axios returns a promise
    const request = axios.get(baseUrl)
    //return to App a promise only with the data requested, no conection related information
    return request.then(response => response.data)
}

const create = (newContact)=>{
    //post new note to server
    const request = axios.post(baseUrl,newContact)
    //return the object posted
    return request.then(response=>response.data)
}

const update = (contactId, updatedContact)=>{
    //put request to server, the formated string is the modified object's url
    const  request = axios.put(`${baseUrl}/${contactId}`,updatedContact)
    return request.then(response=>response.data)
}

const remove = (contactId)=>{
    const request = axios.delete(`${baseUrl}/${contactId}`)
    return request.then(response=>response.data)
}

export default {getAll, create, update, remove}