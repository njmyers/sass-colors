'use strict';

var opacity = 1,
	slope = .8,
	data = {
		colors: {
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
			orange: [255, 127, 0],
			grey: [127, 127, 127]
		},
		prefixes: 
			['lightest', 'lighter', 'light', 'normal', 'dark', 'darker', 'darkest'],
		rgbaColors: 
			[]
	};


data.normal = function() {
	return this;
}

data.changer = function(color, keyword) {

 	var coefficient,
 		ratio,
		l = /light/i,
		d = /dark/i,
		er = /er/i,
		est = /est/i;

	if (est.test(keyword) ) ratio = 0.6; // -est
	else if (er.test(keyword) ) ratio = 0.4; // er
	else ratio = 0.2; //

	// coefficient for secondary colors must be 2x in order to create same amout of variance
	(color == 'yellow' || color == 'cyan' || color == 'magenta') ? coefficient = 255 : coefficient = 255 / 2;

	if (l.test(keyword) ) {
		if (this === 255) return this;
		else {
			return Math.round(this + (ratio * coefficient * 1.05) );
		}
	}

	else if (d.test(keyword) ) {
		if (!this) return this;
		else {
			return Math.round(this - (ratio * coefficient * 1) );
		}
	}

	else {
		return this;
	}

}

data.shader = function(color, keyword) {
	// console.log(args);
	// console.log('Shader this reference: ' + this);
	var arr = this.map( (each) => {
		// console.log(args);
		return data.changer.call(each, color, keyword)
	});//, keyword, ); // Call correct function by keyword on numeric value
	// console.log('shader return array: ' + arr);
	return arr;
}

data.stringifyRGBA = function() {
	// console.log('stringifyRGB this reference: ' + this)
	return this.join(' ,') + ', ' + opacity; // Global var opacity accessible in DOM
}

data.namer = function(prefix, color) {
	var name = '';
	prefix === 'normal' ? name = color : name = color + '-' + prefix;
	return name;
}

data.html = function() {
	var html = '';
	this.forEach(function(each) {
		var name = Object.keys(each)[0]; // Find key name only one property in each object
		console.log(Object.keys(each));
			html += `<section class="boxes" style="background: rgba(${each[name]})">
					<span>Name: $${name}</span>
					<span>Code: rgba(${each[name]})<span> 
					</section>`
	});
	return html
}

data.sass = function() {
	var sass = '';
	this.forEach(function(each) {
		var name = Object.keys(each)[0]; // Only one key in object
		sass += `$${name}: rgba(${each[name]})\n`
	})
	return sass;
}

data.uri = function(code) {
	return 'data:application/octet-stream,' + encodeURIComponent(code);
}

data.gen = function() {
	var arr = [];
	for (var color in this.colors) {
		for (var i = 0; i < this.prefixes.length; i ++) {
			var shade = this.shader.call(this.colors[color], color, this.prefixes[i]),
				name = this.namer(this.prefixes[i], [color]);
			arr.push({ [name]: this.stringifyRGBA.call(shade) });
		}
	}
	// console.log(arr);
	return arr;
	// this.rgbaColors[color] console.log(this.rgbaColors);
}



function genComponents() {

	var myArr = data.gen.call(data, 'normal'),
		sass = data.sass.call(myArr),
		html = data.html.call(myArr),
		uri = data.uri(sass);

	return {
		html, // Colors HTML with inline tag
		sass, // Raw Code Sass Format
		uri 
	};
}


function downloadURI(uri, name) {
	var download = document.getElementById('download');
	if (download) download.remove();
	var link = document.createElement('a');
	link.download = name;
	link.href = uri;
	link.id = 'download';
	link.innerText = `download ${name}`
	document.getElementById('controls').appendChild(link);
}

export default function gen() {
	// Remove Warnings
	var valid = document.getElementById('valid');
	if (valid) valid.remove();
	// Get Input Values
	opacity = document.getElementById('opacity').value;
	slope = document.getElementById('slope').value;
	if (opacity > 0 && slope > 0 && opacity <= 1 && slope <= 1) {
		// Generate Colors
		var obj = genComponents();
		// Add HTML and auto-download file
		document.getElementById('pallete').innerHTML = obj.html;
		downloadURI(obj.uri, 'colors.sass');
	}
	else {
		var p = document.createElement('p');
		p.id = 'valid';
		p.innerHTML = 'Please enter valid values';
		document.getElementById('controls').appendChild(p);
	}
}