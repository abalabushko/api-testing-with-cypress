describe('users api testing', () => {
    let todoItem;
    it('fetches Todo items - GET', () => {
        cy.request('/users').as('usersRequest');
        cy.get('@usersRequest').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isObject(todos.body, 'Users Response is an object')
        });
    });

    it('Adds users - POST', () => {
        cy.request('POST', '/users/', { name: "morpheus", job: "leader" }).as('usersRequest');
        // adds new Todo item by defining Todo name
        cy.get('@usersRequest').then(users => {
            expect(users.status).to.eq(201);
            cy.wrap(users.body).should('deep.include', {
                name: 'morpheus',
                job: 'leader'
            });
        });
    });

    it('delete TODO items - DELETE' , () => {
        cy.request('DELETE', '/users/2').as('usersRequest');
        cy.get('@usersRequest').then(todos => {
            expect(todos.status).to.eq(204);
        });
    });
 });