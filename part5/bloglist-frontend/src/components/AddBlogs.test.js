import React from 'react'
import '@testing-library/jest-dom'   
import { render, screen } from '@testing-library/react'
import AddBlogs from './AddBlogs'
import userEvent from '@testing-library/user-event'

describe('<Blog .../> component tests', ()=>{

    let container
    let user
    let createBlog

    beforeEach(()=>{

        user = userEvent.setup()
        createBlog = jest.fn()

        container = render(
            <AddBlogs createBlog={createBlog}/>
        ).container
    })

    test('All inputs are rendered', async()=>{
        const titleInput = container.querySelector('#TitleInput')
        const urlInput = container.querySelector('#UrlInput')
        const submitButton = container.querySelector('#SubmitButton')

        expect(titleInput).toBeDefined()
        expect(urlInput).toBeDefined()
        expect(submitButton).toBeDefined()
    })

    test('A new blog is created correctly', async()=>{
        const titleInput = container.querySelector('#TitleInput')
        const urlInput = container.querySelector('#UrlInput')
        const submitButton = container.querySelector('#SubmitButton')

        //input new blog info
        await user.type(titleInput, 'New blog title')
        await user.type(urlInput, 'New blog url')
        await user.click(submitButton)

        //check createBlog function is called correctly
        expect(createBlog.mock.calls).toHaveLength(1)
        //check url
        expect(createBlog.mock.calls[0][0]).toBe('New blog url')
        //check title
        expect(createBlog.mock.calls[0][1]).toBe('New blog title')
    })

})