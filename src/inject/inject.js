var selectors = null;

$(document).on('mousedown', '', function(event) {
    //right click
    if(event.button == 2) {
    	selectors = parseElementIntoSelectors($(event.target));
    }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request == "getClickedEl") {
        sendResponse(JSON.stringify(selectors));
    }
});

function parseElementIntoSelectors(element) {
    var selector_chain = [];

    // The target's ancestors
    var selector = element.parents().each(function() {
        selector_chain.push({
            'tag': this.tagName.toLowerCase(),
            'class': [].slice.call(this.classList),
            'id': this.id
        });
    });

    // The target element
    selector_chain.reverse().push({
        'tag': element[0].tagName.toLowerCase(),
        'class': [].slice.call(element[0].classList),
        'id': element[0].id
    });

    return selector_chain;
}