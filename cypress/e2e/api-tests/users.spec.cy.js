describe('users api testing', () => {
    const token = Cypress.env('auth_token')
    const users_url = '/users/'
    const male_gender = "male"
    const username = "morpheus"
    const active_status = "active"

    it('Create user - POST', () => {
        let email = Date.now() + '@test.com'

        cy.request(
            {
            method: 'POST', 
            url: users_url,
            auth: {
            'bearer': token
            },
            body:
                {
                name: username, 
                gender: male_gender,
                email: email,
                status: active_status
            }
        })
        .as('user')
        .then((response) => {
            cy.writeFile('cypress/fixtures/users.json', response.body)
        })
        cy.get('@user')
            .its('status')
            .should('eq', 201)
    })

    it('fetches created user - GET', () => {
        cy.fixture('users').then((users) => {
            const userId = users.id
        
        cy.request({
            url: users_url + userId,
            auth:
            {
                'bearer': token
            }
        })
                .as('getUser')
        cy.get('@getUser')
            .its('status')
            .should('eq', 200)
        })
     })
     
     it('Add duplicate users - POST', () => {
        cy.fixture('users').then((users) => {
            const name = users.name
            const gender = users.gender
            const user_email = users.email
            const status = users.status

        cy.request(
            {
            method: 'POST', 
            url: users_url,
            auth: {
            'bearer': token
            },
            failOnStatusCode: false,
            body:
                {
                name: name, 
                gender: gender,
                email: user_email,
                status: status
            }
        })
        .should((response) => {
            expect(response.status).to.eq(422)
            expect(response.body).to.deep.eq([{ field: 'email', message: 'has already been taken'}])
        })
    })
})

     it('update user status - PUT', () => {
        const inactive_status = 'inactive'
        cy.fixture('users').then((users) => {
            const userId = users.id
        
            cy.request({
                method: 'PUT',
                url: users_url + userId,
                auth: {
                    'bearer': token
                },
                body: {
                    status: inactive_status
                }
            })
            .as('updateUser')
            cy.get('@updateUser')
                .its('body')
                .should('include', {status: inactive_status})
        })
     })

    it('delete user - DELETE' , () => {
        cy.fixture('users').then((users) => {
            const userId = users.id

        cy.request({
            method: 'DELETE',
            url: users_url + userId,
            auth: {
                'bearer': token
                }
            })
            .as('deleteUser')

        cy.get('@deleteUser')
            .its('status')
            .should('eq', 204)
    })

    it('fetch deleted user - GET', () => {
        cy.fixture('users').then((users) => {
            const userId = users.id
        cy.request({
            url: users_url + userId,
             failOnStatusCode: false
            })
            .as('getUser')

            cy.get('@getUser')
            .its('status')
            .should('eq', 404)
        })
        })  
    })
})