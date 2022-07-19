describe('POKE REST API Test with Cypress', () => {
    
    it('API test - validate headers' , () => {

        cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('API test - validate status', () => {

        cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('status')
            .should('eq', 200)
    })

    it('API Test - validate name value', () => {

        cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemon')
        cy.get('@pokemon')
            .its('body')
            .should('include', {name: 'pikachu'})

    })

    it('API Test - validate negative status code', () => {

        cy.request({ 
            method:'GET',
            url:'https://pokeapi.co/api/v2/pokemon/2500',
            failOnStatusCode:false
        }).as('pokemon')
        cy.get('@pokemon')
            .its('status')
            .should('eq', 404)
    })

})

    