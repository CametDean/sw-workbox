self.addEventListener('install', (event) => {
	console.info('SW: install');
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	console.info('SW: activate');
	event.waitUntil(self.clients.claim());
});