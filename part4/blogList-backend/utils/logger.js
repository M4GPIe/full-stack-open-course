const info = (...params) => {
    //avoid logging operations during tests
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
    }
}
  
const error = (...params) => {
    //avoid logging operations during tests
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
    }
}

module.exports = {
    info, error
}