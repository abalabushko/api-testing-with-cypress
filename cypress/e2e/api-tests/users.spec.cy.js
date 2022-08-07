describe('users api testing', () => {

    it('fetches users - GET', () => {
        const token = Cypress.env('auth_token')
        cy.request('https://gorest.co.in/public/v2/users', {
        'auth': {
            'bearer': token
          }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // it('Adds users - POST', () => {

    //     cy.request('POST', '/users/', { name: "morpheus", job: "leader" })
    //         .then(response => {
    //         expect(response.status).to.eq(201);
    //         cy.wrap(response.body).should('deep.include', {
    //             name: 'morpheus',
    //             job: 'leader'
    //         });
    //     });
    // });

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
 });