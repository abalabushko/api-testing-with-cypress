describe('POKE REST API Test with Cypress', () => {
    
    it('API test - validate headers' , () => {

        cy.request('/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('API test - validate status', () => {

        cy.request('/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('status')
            .should('eq', 200)
    })

    it('get by id - validate name value', () => {

        cy.request('/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('body')
            .should('include', {name: 'pikachu'})

    })

    it('get by name - validate name value', () => {

        cy.request('/pokemon/pikachu').as('pokemon')
        cy.get('@pokemon')
            .its('body')
            .should('include', {name: 'pikachu'})

    })

    it('API Test - validate negative status code', () => {

        cy.request({ 
            method:'GET',
            url:'/2500',
            failOnStatusCode:false
        }).as('pokemon')
        cy.get('@pokemon')
            .its('status')
            .should('eq', 404)
    })

})

    