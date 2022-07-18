describe('users api testing', () => {


    it('fetches Todo items - GET', () => {

        cy.request('GET', '/users')
        .then((response) => {
            expect(response.status).to.eq(200);
            assert.isObject(response.body, 'Users Response is an object')
        });
    });

    it('Adds users - POST', () => {

        cy.request('POST', '/users/', { name: "morpheus", job: "leader" })
            .then(response => {
            expect(response.status).to.eq(201);
            cy.wrap(response.body).should('deep.include', {
                name: 'morpheus',
                job: 'leader'
            });
        });
    });

    it('delete TODO items - DELETE' , () => {

        cy.request('DELETE', '/users/2')
        .then(response => {
            expect(response.status).to.eq(204);
        });
    });
 });