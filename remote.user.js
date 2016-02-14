// ==UserScript==

// @name          Youtube Remote Control

// @namespace     http://www.youtube.com


// @include       *

// ==/UserScript==

(function() {

	function loadScript(url) {

		var script = document.createElement('script');
		script.src = url;
		document.body.appendChild(script);
	}

	loadScript("https://qwile.com/qwile.remote.js");
    
})();