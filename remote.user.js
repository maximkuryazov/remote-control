// ==UserScript==

// @name          Youtube Remote Control

// @namespace     http://www.youtube.com


// @include       *

// ==/UserScript==

(function() {

	function loadScript(url, callback) {

		var script = document.createElement('script');
		script.src = url;
		document.body.appendChild(script);
		script.onload = callback;
	}

	loadScript("https://qwile.com/qwile.remote.js");
    
})();
