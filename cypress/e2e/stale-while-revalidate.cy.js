const goOffline = () => {
	cy.intercept('*', request => {
		request.destroy();
	});
};
const goOnline = () => {
	cy.intercept('*', request => {
		request.continue();
	});
};

describe('Stratégie de cache Stale While Revalidate', () => {

	it('Affiche une erreur au premier click en mode hors-ligne, puis affiche la liste des livres en mode en ligne puis en mode hors-ligne', () => {

		cy.visit('/', {
			onLoad(win) {
				win.caches.keys().then((cacheNames) => {
					cacheNames.forEach((cacheName) => {
						win.caches.delete(cacheName);
					});
				});
			},
		});

		goOffline();

		cy.get('#telecharger-livres').click();
		cy.contains('Failed to fetch');

		goOnline();

		cy.get('#telecharger-livres').click();
		cy.contains('Culture code');
		cy.contains('Harry Potter');

		cy.visit('/');

		goOffline();

		cy.get('#telecharger-livres').click();
		cy.contains('Culture code');
		cy.contains('Harry Potter');
	});

});

