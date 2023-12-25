describe('users api testing', () => {
    const TOKEN = Cypress.env('auth_token')
    cy.log(`Authentication Token: ${auth_token}`);
    const USERS_URL = '/users/'
    const MALE_GENDER = "male"
    const USERNAME = "morpheus"
    const ACTIVE_STATUS = "active"

    it('Create user - POST', () => {
        let email = Date.now() + '@test.com'

        cy.request(
            {
            method: 'POST', 
            url: USERS_URL,
            auth: {
            'bearer': TOKEN
            },
            body:
                {
                name: USERNAME, 
                gender: MALE_GENDER,
                email: email,
                status: ACTIVE_STATUS
            }
        })
        .should((response) => {
            expect(response.status).to.eq(201)
        })
        .then((response) => {
            cy.writeFile('cypress/fixtures/users.json', response.body)
        })
    })

    it('fetches created user - GET', () => {
        cy.fixture('users').then((users) => {
            const USER_ID = users.id
        
        cy.request({
            url: USERS_URL + USER_ID,
            auth:
            {
                'bearer': TOKEN
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include({id: USER_ID})
        })
        })
     })
     
     it('Add duplicate users - POST', () => {
        cy.fixture('users').then((users) => {
            const NAME = users.name
            const GENDER = users.gender
            const USER_EMAIL = users.email
            const STATUS = users.status

        cy.request(
            {
            method: 'POST', 
            url: USERS_URL,
            auth: {
            'bearer': TOKEN
            },
            failOnStatusCode: false,
            body:
                {
                name: NAME, 
                gender: GENDER,
                email: USER_EMAIL,
                status: STATUS
            }
        })
            .should((response) => {
                expect(response.status).to.eq(422)
                expect(response.body).to.deep.eq([{ field: 'email', message: 'has already been taken'}])
            })
        })
    })

     it('update user status - PUT', () => {
        const INACTIVE_STATUS = 'inactive'
        cy.fixture('users').then((users) => {
            const USER_ID = users.id
        
            cy.request({
                method: 'PUT',
                url: USERS_URL + USER_ID,
                auth: {
                    'bearer': TOKEN
                },
                body: {
                    status: INACTIVE_STATUS
                }
            })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.include({status: INACTIVE_STATUS})
            })
        })
     })

    it('delete user - DELETE' , () => {
        cy.fixture('users').then((users) => {
            const USER_ID = users.id

        cy.request({
            method: 'DELETE',
            url: USERS_URL + USER_ID,
            auth: {
                'bearer': TOKEN
                }
        })
            .should((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })

    it('fetch deleted user - GET', () => {
        cy.fixture('users').then((users) => {
            const USER_ID = users.id
        
            cy.request({
                url: USERS_URL + USER_ID,
                failOnStatusCode: false
            })

                .should((response) => {
                    expect(response.status).to.eq(404)
                })
        })  
    })
})