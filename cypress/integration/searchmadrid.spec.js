describe('Weather app global test', function() {
    it('Should perfectly works', function() {
      cy.visit('http://localhost:3000')

      cy.get('.inputLocation')
        .type('lisbon')
        .should('have.value', 'lisbon')

        cy.get('.search-btn').click()

        cy.get('.weatherCondition')
        .should('contain', 'FEW CLOUDS')

        cy.get('.temperature')
        .should('contain', '23°')

        cy.get('.place')
        .should('contain', 'Lisbon')

        cy.get('.date')
        .should('contain', '20, Oct')
        
    })
  })