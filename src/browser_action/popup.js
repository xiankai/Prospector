var entry_template = $('.entry').clone();
$('.entry').remove();

function addEntry(id, string) {
	var new_entry = entry_template.clone();
	new_entry.data('id', id);
	new_entry.find('span').html(string.substr(0, 15) + '...').attr('title', string);
	$('#entries').append(new_entry);
}

function loadEntries() {
	$('#entries').empty();
	var strategy = getCurrentStrategyFunction();
	for (var i in localStorage) {
		addEntry(i, strategy(JSON.parse(localStorage[i])));
	}
}

loadEntries();

$('#strategy').on('change', loadEntries);

$('#export').on('click', function() {
	var entries = collateEntries();

	switch($(this).val()) {
		case 1: // jQuery
			break;
		case 2: // Xpath
			break;
		default: 
			alert('Please select a valid strategy!');
	}
});

$('#entries').on('click', 'img', function() {
	var entry = $(this).parents('.entry');
	delete localStorage[entry.data('id')];
	entry.remove();
})

$('#entries').on('click', '.entry span', function() {
	$('#clipboard').val($(this).attr('title')).select();
	document.execCommand('copy');
})

function collateEntries() {
	var entries = [];
	$('.entries').each(function() {
		var label = $(this).find('input[type=text]').val();
		var name = $(this).find('span').html();
		entries.push({
			label: $(this).find('input[type=text]').val(),
			name: $(this).find('span').html(),
		});
	});

	return entries;
}

function getCurrentStrategyFunction() {
	switch($('#strategy').val()) {
		case 'jquery_tags':
			return jQueryTags;
		case 'dom_xpath':
			return DOMXpath;
		default:
			return;
	}
}

function jQueryTags(array) {
	var last_id = array.length - 1;
	var tags = $.map(array, function(ele, i) {
		// Last tag, be as specific as possible NAO
		if (i === last_id) {
			var last_ele = ele;
			if (ele.id) {
				return ele.id;
			}

			if (ele.class) {
				return ele.class.join('.');
			}
		}

		return ele.tag; 
	});

	return tags.join(' > ');
}

function DOMXpath(array) {
	return array;
}