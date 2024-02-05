//separate dev logging functions into their own module
//useful if you want to export the logs into a file or logging service

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}