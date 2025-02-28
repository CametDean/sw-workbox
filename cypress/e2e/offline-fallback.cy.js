export const goOffline = () => {
	cy.log('**go offline**')
	.then(() => {
		return Cypress.automation('remote:debugger:protocol',
				{
					command: 'Network.enable',
				})
	})
	.then(() => {
		return Cypress.automation('remote:debugger:protocol',
				{
					command: 'Network.emulateNetworkConditions',
					params: {
						offline: true,
						latency: -1,
						downloadThroughput: -1,
						uploadThroughput: -1,
					},
				})
	})
}

export const goOnline = () => {
	cy.log('**go offline**')
	.then(() => {
		return Cypress.automation('remote:debugger:protocol',
				{
					command: 'Network.emulateNetworkConditions',
					params: {
						offline: false,
						latency: -1,
						downloadThroughput: -1,
						uploadThroughput: -1,
					},
				})
	.then(() => {
		return Cypress.automation('remote:debugger:protocol',
				{
					command: 'Network.disable',
				})
	})
	})
}

export const assertOffline = () => {
	return cy.wrap(window).its('navigator.onLine').should('be.false')
}

export const assertOnline = () => {
	return cy.wrap(window).its('navigator.onLine').should('be.true')
}

describe('Page de fallback en mode hors-ligne', () => {

	it('Affiche la page offline.html quand on passe en mode hors-ligne et que la page est rechargée', () => {

		cy.visit('/');
		
		goOffline()

		assertOffline();

		cy.get('my-router').shadow().find('liste-livre').shadow().find('#telecharger-livres').click();
		cy.contains('Failed to fetch');
		
		//cy.contains('Ma liste des livres');
		//cy.contains('Vous êtes hors-ligne');
	});
	
});