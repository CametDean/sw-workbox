importScripts(
		'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
const {setDefaultHandler} = workbox.routing
const {NetworkFirst} = workbox.strategies
const {offlineFallback} = workbox.recipes;

self.addEventListener('install', (event) => {
	console.info('SW: install');
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	console.info('SW: activate');
	event.waitUntil(self.clients.claim());
});

setDefaultHandler(new NetworkFirst());

offlineFallback();