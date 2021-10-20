describe('Weather app global test', function() {
    it('Should perfectly works', function() {
      cy.visit('http://localhost:3000')

      cy.get('.inputLocation')
        .type('madrid')
        .should('have.value', 'madrid')

        cy.get('.search-btn').click()

        cy.get('.weatherCondition')
        .should('contain', 'CLEAR SKY')

        cy.get('.temperature')
        .should('contain', '22°')

        cy.get('.place')
        .should('contain', 'Madrid')

        cy.get('.date')
        .should('contain', '20, Oct')
        
    })
  })