//example helper functions to be checked in the unit tests
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((res, blog)=>{return res+blog.likes},0)
}

const favoriteBlog = (blogs) => {

    if(blogs.length===0){return -1}

    let maxLikes = Math.max(...blogs.map(b => b.likes))
    let mostLikedBlog = blogs.find(blog => blog.likes === maxLikes)

    return {
        title : mostLikedBlog.title,
        author : mostLikedBlog.author,
        likes : mostLikedBlog.likes
    }
}

const mostBlogs = (blogs)=>{

    let blog_count = {}
    let keys = []

    blogs.map(blog => {
        if(blog_count[blog.author]){
            blog_count[blog.author] += 1
        }else{
            blog_count[blog.author] = 1
            keys = keys.concat(blog.author)
        }
    })

    let max = 0
    let max_author = ''

    for(i in keys){
        if(blog_count[keys[i]]>max){
            max = blog_count[keys[i]]
            max_author = keys[i]
        }
    }

    return{
        author : max_author,
        blogs : max
    }
}

const mostLikes = (blogs)=>{

    let like_count = {}
    let keys = []
    
    blogs.map(blog => {
        if(like_count[blog.author]){
            like_count[blog.author] += blog.likes
        }else{
            like_count[blog.author] = blog.likes
            keys = keys.concat(blog.author)
        }
    })

    let max = 0
    let max_author = ''

    for(i in keys){
        if(like_count[keys[i]]>max){
            max = like_count[keys[i]]
            max_author = keys[i]
        }
    }

    return{
        author : max_author,
        likes : max
    }
}

const  generateRandomIndex = (length) => {
    return parseInt(Math.random()*(length-1))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    generateRandomIndex
}