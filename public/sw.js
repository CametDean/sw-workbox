importScripts(
		'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
);

const {NetworkFirst} = workbox.strategies;

self.addEventListener('install', (event) => {
	console.info('SW: install');
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	console.info('SW: activate');
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', async (event) => {
	console.info('SW: fetch');

	const request = event.request;

	// Si l'url de la requete provient d'une extension chrome
	if(request.url.includes('chrome-extension')){
		// renvoie le résultat de notre requete
		return await fetch(event.request);
	}
	
	const networkFirst = new NetworkFirst();
	event.respondWith(networkFirst.handle({event, request}));
	
});