importScripts(
		'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
const {setDefaultHandler} = workbox.routing
const {CacheFirst, StaleWhileRevalidate} = workbox.strategies

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

	setDefaultHandler(new CacheFirst());

	const request = event.request;

	if(request.url.includes('chrome-extension')){
		return await fetch(event.request);
	}

	const staleWhileRevalidate = new StaleWhileRevalidate();
	event.respondWith(staleWhileRevalidate.handle({event, request}));
	
});