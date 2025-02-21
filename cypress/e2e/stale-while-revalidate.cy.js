const goOffline = () => {
  /*cy.log('**go offline**')
      // stub every request with a StaticResponse to simulate network error
      .then(() => cy.intercept('*', { forceNetworkError: true }))
      .then(() =>
      cy.window().then((win) => win.dispatchEvent(new Event('offline')))
  )*/
  cy.intercept('*', request =>
  {
    request.destroy()
  })
}
const goOnline = () => {
  /*cy.log('**go online**')
      // go back to normal network behavior
      .then(() => cy.intercept('*'), {forceNetworkError: false})
      .then(() =>
      cy.window().then((win) => win.dispatchEvent(new Event('online')))
  )*/
  cy.intercept('*', request =>
  {
    request.continue()
  })
}


describe('Stratégie de cache Stale While Revalidate', () => {
  
  it('shows error trying to fetch users in offline mode', () => {
    
    cy.visit('/', {
      onLoad(win) {
        win.caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            win.caches.delete(cacheName)
          })
        })
      }
    })

    goOffline()

    cy.get('#telecharger-livres').click()
    cy.contains('Failed to fetch')
    
    goOnline()

    cy.get('#telecharger-livres').click()
    cy.contains('Culture code')
    cy.contains('Harry Potter')

    cy.visit('/')
    
    goOffline()

    cy.get('#telecharger-livres').click()
    cy.contains('Culture code')
    cy.contains('Harry Potter')
  })
  
})

/*
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

  xdescribe('En mode offline', {browser: '!firefox'}, () => {
    
    beforeEach(() => {
      // Mise en cache via le SW
      cy.visit('/')
      cy.contains('Télécharger la liste des livres').click()
      
      // Passage en mode offline
      goOffline()
    })

    afterEach(goOnline)

    it('En mode offline, au click sur le bouton, affiche la liste des livres', () => {
      cy.visit('/')

      cy.contains('Télécharger la liste des livres').click()

      cy.request('GET', 'https://cms-headless-core.ln1.eu/livres')

      cy.contains('Culture code')
      cy.contains('Harry Potter')
    })
    
  })

* */

