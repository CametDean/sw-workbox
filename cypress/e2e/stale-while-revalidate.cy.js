import {
	assertOffline,
	assertOnline,
} from './offline-fallback.cy';

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

const getListeLivre = () => {
	return cy.get('my-router').shadow().find('liste-livre').shadow();
}

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
		
		getListeLivre().find('#telecharger-livres').click();
		getListeLivre().contains('Failed to fetch');

		goOnline();

		getListeLivre().find('#telecharger-livres').click();
		getListeLivre().find('apercu-livre').shadow().contains('Culture code');
		getListeLivre().find('apercu-livre').shadow().contains('Harry Potter');

		cy.visit('/');

		goOffline();

		assertOffline()

		getListeLivre().find('#telecharger-livres').click();
		getListeLivre().find('apercu-livre').shadow().contains('Culture code');
		getListeLivre().find('apercu-livre').shadow().contains('Harry Potter');
	});

});

