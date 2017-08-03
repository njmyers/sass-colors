'use strict';

var opacity = 1,
	slope = 1,
	formulas = {
		lightest: lightening(1.2),
		lighter: lightening(1.3),
		light: lightening(1.5),
		normal: normal(),
		dark: darkening(1.2),
		darker: darkening(1.3),
		darkest: darkening(1.5)
	},
	colors = {
		red: [255, 0, 0],
		rose: [255, 0, 127],
		magenta: [255, 0, 255],
		purple: [127, 0, 255],
		blue: [0, 0, 255],
		cobalt: [0, 127, 255],
		cyan: [0, 255, 255],
		aqua: [0, 255, 127],
		green: [0, 255, 0],
		lime: [127, 255, 0],
		yellow: [255, 255, 0],
		orange: [255, 127, 0]
	};

function darkening (divisor) {
	return function (args) {
		var str = '';
		for (var i = 0; i < args.length; i ++ ) {
			if (!args[i]) {
				str += args[i] + ', ';
			}
			else {
				str += (Math.round(args[i] / divisor)) + ', ';
			}
		}
		str += opacity;
		return str;
	};
}

function lightening (divisor) {
	return function (args) {
		var str = '';
		for (var i = 0; i < args.length; i ++ ) {
			if (args[i] === 255) {
				str += args[i] + ', ';
			}
			else {
				str += (Math.round((args[i] + 127) / divisor)) + ', ';
			}
		}
		str += opacity;
		return str;
	};
}

function normal(arr) {
	return function(arr) {
		var str = '';
		for (var i = 0; i < arr.length; i ++) {
			str += arr[i] + ', ';
		}
		str += opacity;
		return str;
	};
}

function downloadURI(uri, name) {
	var link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function generate() {
	var html = '',
		sass = '',
		code = '',
		name = '';

	for (var color in colors) {
		for (var shade in formulas) {
			code = formulas[shade](colors[color]);
			(shade === 'normal') ? name = color : name = color + '-' + shade;
			html += `<section class="boxes" style="background: rgba(${code})">
					<span>Name: $${name}</span>
					<span>Code: rgba(${code})<span> 
					</section>`;
			sass += `$${name}: rgba(${code})\n`;
		}
	}

	var uri = 'data:application/octet-stream,' + encodeURIComponent(sass);

	return {
		html, // Colors
		sass, // Raw Code
		uri   // Downloadable URI  
	};
}

export default function gen() {
	// if (p) document.
	// Get Input Values First
	opacity = document.getElementById('opacity').value;
	slope = document.getElementById('slope').value;
	if ((opacity && slope) > 0 && (opacity && slope) <= 1) {
		// Generate Colors
		var obj = generate();
		// Add HTML and auto-download file
		document.getElementById('pallet').innerHTML = obj.html;
		downloadURI(obj.uri, 'colors.sass');
	}
	else {
		var p = document.createElement('p');
		p.innerHTML = 'Please enter valid values';
		document.getElementById('controls').appendChild(p);
	}
}