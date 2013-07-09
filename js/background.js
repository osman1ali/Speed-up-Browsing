chrome.webRequest.onHeadersReceived.addListener(function (object) {
	var object_type = object.type.toLowerCase();
	if ((object_type != "main_frame") && (object_type != "sub_frame") && (object_type != "xmlhttprequest")) {
		var headers = object.responseHeaders, len = headers.length - 1,	f = false, elem = null;
		do {
			elem = headers[len];
			switch (elem.name.toLowerCase()) {
				case "cache-control":
					if (!f) {
						f = true;
						elem.value = 'private, max-age=' + txt_cache;
					} else {						
						headers.splice(len, 1);
					}					
					break;
				case "expires":
				case "last-modified":
				case "etag":
					headers.splice(len, 1);
					break;
				default:
					break;
			}
		} while (len--);
		if (!f) {
			var obj = null;
			obj = {};
			obj.name = "Cache-Control";
			obj.value = 'private, max-age=' + txt_cache;
			headers.push(obj);
		}
		return {
			responseHeaders: headers
		};
	}
}, {
	urls: ["<all_urls>"]
}, ["blocking", "responseHeaders"]);
chrome.runtime.onInstalled.addListener(function (object) {
	localStorage.run = true;
	icon = localStorage.icon = true;
	txt_cache = localStorage.txt_cache = '604800';
});
if (localStorage.run) {
	icon = localStorage.icon;
	txt_cache = localStorage.txt_cache;
} else {
	localStorage.run = true;
	icon = localStorage.icon = true;
	txt_cache = localStorage.txt_cache = '604800';
}