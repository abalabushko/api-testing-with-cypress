describe('users api testing', () => {
    const token = Cypress.env('auth_token')
    const users_url = '/users'

    it('fetches users - GET', () => {
        cy.request(users_url)
        .then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Adds users - POST', () => {

        let email = Date.now() + '@test.com'
        cy.request(
            {
            method: 'POST', 
            url: users_url,
            auth: {
            'bearer': token
            },
            form: true,
            body:
                {
                name: "morpheus", 
                gender: "female",
                email: email,
                status: "active" 
            }
        })
            .then(response => {
            expect(response.status).to.eq(201);
            cy.wrap(response.body)
            .should('deep.include',
             {
                name: 'morpheus',
                gender: "female",
                email: email,
                status: "active" 
            })
        })
    })

    // it('delete user - DELETE' , () => {

    //     cy.request('DELETE', '/users/2')
    //     .then(response => {
    //         expect(response.status).to.eq(204);
    //     });
    // });

    // it('not found test - GET' , () => {

    //     cy.request({ url: '/users/23',  failOnStatusCode: false })
    //     .then(response => {
    //         expect(response.status).to.eq(404);
    //     });
    // });
 })