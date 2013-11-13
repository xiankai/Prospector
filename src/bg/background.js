// if you checked "fancy-settings" in extensionizr.com, uncomment this lines
// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

function querySelector(info, tab) {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", function(selector_string) {
    	try {
    		JSON.parse(selector_string);
			localStorage[localStorage.length] = selector_string;
    	} catch (e) {
    		console.log('Unable to save selector!');
    	}
    });
}

var id = chrome.contextMenus.create({
	title: "Scrapper",
	contexts: ["all"],
	onclick: querySelector
});