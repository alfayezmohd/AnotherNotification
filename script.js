const textfield = document.getElementById("textfield");
textfield.addEventListener('focus', function() {
	textfield.select();
});

addEventListener('load', async () => {
	let sw = await navigator.serviceWorker.register('sw.js');
	console.log('SW registered!');
});

// Public base64 to Uint
function urlBase64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - base64String.length % 4) % 4);
	var base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	var rawData = window.atob(base64);
	var outputArray = new Uint8Array(rawData.length);

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

async function subscribe() {
	document.getElementById('textfield').value = 'here';
	let sw = await navigator.serviceWorker.ready;
	let push = await sw.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array('BOCyrJtmDuQPnp44gc5YY8rJEkLsMM0SRyc9BKT4rVp0L-9KUWd0iMsZePyL7yjG7oJNnWeQ4YXrqADW201yE5I')
	});
	console.log(push);
	console.log('=========================');
	console.log(JSON.stringify(push));
	console.log('=========================');
	document.getElementById('textfield').value = 'here1';
	document.getElementById('textfield').value = JSON.stringify(push);
}

//https://web-push-codelab.glitch.me/
//public key = BOCyrJtmDuQPnp44gc5YY8rJEkLsMM0SRyc9BKT4rVp0L-9KUWd0iMsZePyL7yjG7oJNnWeQ4YXrqADW201yE5I
//private key = 7gyEAQMlUKeaJ31KI9MlJr-E4vVJoueaZrg2OWOvnoM