const goOffline = () => {
	cy.log('**go offline**')
	cy.intercept('*', request => {
		request.destroy();
	});
};
const goOnline = () => {
	cy.log('**go online**')
	cy.intercept('*', request => {
		request.continue();
	});
};

const goOfflineMode = () => {
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

describe('Page de fallback en mode hors-ligne', () => {

	it.skip('Affiche la page offline.html quand on passe en mode hors-ligne et que la page est rechargée', () => {

		cy.visit('/', {
			onLoad(win) {
				win.caches.open("workbox-offline-fallbacks").then((cache) => {
					cache.add('/offline.html')
				});
			},
		}).wait(1000);
		
		//goOfflineMode();

		goOffline()

		cy.visit('/');
		
		cy.contains('Vous êtes hors-ligne');

		//goOnline();

		//cy.visit('/');

		//cy.contains('Ma liste des livres');
	});
	
});