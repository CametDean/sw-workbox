describe('Stratégie de cache Stale While Revalidate', () => {
  
  it('Arrive sur notre site', () => {
    cy.visit('/')
  })
  
  it('Trouve le bouton "Télécharger la liste des livres"', () => {
    cy.visit('/')

    cy.contains('Télécharger la liste des livres')
  })
  
  it('Au click sur le bouton, affiche la liste des livres', () => {
    cy.visit('/')

    cy.contains('Télécharger la liste des livres').click()

    cy.request('GET', 'https://cms-headless-core.ln1.eu/livres')
    
    cy.contains('Culture code')
    cy.contains('Harry Potter')
  })
})