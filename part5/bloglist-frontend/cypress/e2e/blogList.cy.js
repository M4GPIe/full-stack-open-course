describe('BlogList app', function() {

  beforeEach(function(){
    //reset DB
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    //add 2 new users
    const user = {
      name: 'Morgan Freeman',
      userName: 'user1',
      password: '123456'
    }
		//post new user
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 

    const user2 = {
      name: 'Mathew James',
      userName: 'user2',
      password: '654321'
    }
		//post new user
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

    //visit main page
    cy.visit('')
  })

  it('login form can be opened', function() {
    cy.contains('Log in')
    cy.contains('Log in to application')
  })

  it('wrong log in', function() {
    cy.get('#userNameInput').type('user2')
    cy.get('#passwordInput').type('wrong')
    cy.get('#loginSubmitButton').click()
    cy.contains('Bad login credentials Error: Invalid username or password')
  })

  it('correct login', function() {
    cy.get('#userNameInput').type('user1')
    cy.get('#passwordInput').type('123456')
    cy.get('#loginSubmitButton').click()
    cy.contains('Logged in as user1')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({userName : 'user1', password: '123456'})
    })

    it('A blog can be created', function() {
      //fill and submit form
      cy.contains('Create new Blog').click()
      cy.get('#TitleInput').type('new blog title')
      cy.get('#UrlInput').type('example/url')
      cy.get('#SubmitButton').click()

      //check updated blog list
      cy.contains('new blog title')
    })

    describe('more than one blog created',function(){
      beforeEach(function() {
        //create two blogs as user1
        cy.createBlog({blogTitle: 'user1 first blog',blogUrl: '/example/1', likes: 4})
        cy.createBlog({blogTitle: 'user1 second blog',blogUrl: '/example/2/a', likes: 2})

        //login as user 2
        cy.login({userName: 'user2', password: '654321'})
        //crete one blog as user2
        cy.createBlog({blogTitle: 'user2 first blog',blogUrl: '/a/different/url', likes: 0})
      })

      it('a user can like a blog',function(){
        cy.contains('user1 first blog').parent().contains('See more info').click()
        cy.contains('Like').click()
        cy.get('html').should('contain','Likes: 5')
      })

      it('the owner can delete a blog',function(){
        //when confirmation pop up appears press yes
        cy.on('window:confirm', () => true)
        //find delete button and press
        cy.contains('user2 first blog').parent().contains('See more info').click()
        cy.contains('Delete').click()
        //check correct deletion of the blog
        cy.contains('user2 first blog - user2').should('not.exist')
        cy.contains('Deleted "user2 first blog"').should('not.exist')
      })

      it('only creator can delete a blog',function(){
        cy.on('window:confirm', () => true)
        cy.contains('user1 first blog').parent().contains('See more info').click()
        cy.contains('Delete').click()
        //check correct error message
        cy.contains('Something wrong happened :( Error: user is not the owner of this blog')
      })

      it('blogs are ordered correctly by number of likes',function(){
        cy.get('.blog').eq(0).should('contain', 'user1 first blog')
        cy.get('.blog').eq(1).should('contain', 'user1 second blog')
        cy.get('.blog').eq(2).should('contain', 'user2 first blog')
      })
    })
  })
})