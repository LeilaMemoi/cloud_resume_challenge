

describe('Visitor Counter Test on Page Load', () => {
  it('Should increase visitor count by 1 on reload', () => {
    // Intercept the actual API
    cy.intercept('POST', '**/visitorCountFunction').as('visitorAPI')

    // Visit the site and wait for visitor count API
    cy.visit('https://leilamaritim.com/')
    cy.wait('@visitorAPI').then((interception) => {
      const initialCount = interception.response.body.visits
      cy.log('Initial visitor count:', initialCount)

      // Assert it’s a number
      expect(initialCount).to.be.a('number').and.to.be.greaterThan(0)

      // Reload to simulate new visit
      cy.reload()

      // Wait again for the API
      cy.wait('@visitorAPI').then((secondIntercept) => {
        const updatedCount = secondIntercept.response.body.visits
        cy.log('Updated visitor count:', updatedCount)

        // Assert that the counter increased by 1
        expect(updatedCount).to.equal(initialCount + 1)
      })
    })
  })
})
