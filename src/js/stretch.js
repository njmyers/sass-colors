const stretch = {}

stretch.letters = function() {
	
	[].forEach.call(document.getElementsByClassName('stretch-letters'), function(each) {

		var letters = each.innerHTML.split('');
		var divided = '';

		console.log(letters);

		for (var i = 0; i < letters.length; i ++) {
			divided += `<span>${letters[i]}</span>`;
		}

		each.innerHTML = divided
	})
}

stretch.words = function() {

	[].forEach.call(document.getElementsByClassName('stretch-words'), function(each) {

		var letters = each.innerHTML.split(' ');
		var divided = '';

		// console.log(letters);

		for (var i = 0; i < letters.length; i ++) {
			divided += `<span>${letters[i]} </span>`;
		}

		each.innerHTML = divided
	})	
}

export default stretch