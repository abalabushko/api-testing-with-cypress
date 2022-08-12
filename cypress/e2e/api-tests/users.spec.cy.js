describe('users api testing', () => {
    const token = Cypress.env('auth_token')
    const users_url = '/users/'
    const male_gender = "male"
    const username = "morpheus"
    const active_status = "active"

    it('Adds users - POST', () => {
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