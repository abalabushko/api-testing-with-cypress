describe('TODO api testing', () => {
    let todoItem;
    it('fetches Todo items - GET', () => {
        cy.request('/todos/').as('todoRequest');
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isArray(todos.body, 'Todos Response is an array')
        });
    });
 });
 