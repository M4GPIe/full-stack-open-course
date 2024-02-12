import React from 'react'
import '@testing-library/jest-dom'   
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog .../> component tests', ()=>{

    let container
    let user
    let addLike
    let deleteBlog
    let blog

    beforeEach(()=>{
        blog = {
            title: "blog title",
            author: {id: "asd477nkf234", userName: "user1"},
            url: "blog/url",
            likes: 12
        }

        user = userEvent.setup()
        addLike = jest.fn()
        deleteBlog = jest.fn()

        container = render(
            <Blog blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>
        ).container
    })

    test('Blog displays ONLY title and author by default', async()=>{
        //check if title is displayed
        const title = screen.findByText(blog.title)
        //check if author is displayed
        const author = screen.findByText(blog.author.userName)
        //url is not displayed
        const url = screen.queryByText(blog.url)
        expect(url).toBeNull
        //likes are not displayed
        const likes = screen.queryByText(blog.likes)
        expect(likes).toBeNull
    })

    test('All details are shown when "See More Info" button is clicked', async()=>{

        //find and click expand button
        const expandButton = container.querySelector('#ExpandButton')
        await user.click(expandButton)

        //check all details are shown
        const title = screen.findByText(blog.title)
        const author = screen.findByText(blog.author.userName)
        const url = screen.findByText(blog.url)
        expect(url).toBeDefined()
        const likes = screen.findByText(blog.likes)
        expect(likes).toBeDefined()
    })

    test('When like button is clicked twice, it adds exactly two likes',async()=>{
        //find and click expand button
        const expandButton = container.querySelector('#ExpandButton')
        await user.click(expandButton)

        //find and click like button
        const likeButton = container.querySelector('#LikeButton')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(addLike.mock.calls).toHaveLength(2)
    })

})