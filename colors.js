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
		prefixes: ['lightest', 'lighter', 'light', 'normal', 'dark', 'darker', 'darkest'],
		rgbaColors: []
	};


data.normal = function() {
	return this;
}

data.light = function() {
	if (this === 255) return this;
	else return Math.round(this + (.4 * 127));
}

data.lighter = function() {
	if (this === 255) return this;
	else return Math.round(this + (.6 * 127));
}

data.lightest = function() {
	if (this === 255) return this;
	else return Math.round(this + (.8 * 127));
}

data.dark = function() {
	if (!this) return this;
	else return Math.round(this - (.2 * 127));
}

data.darker = function() {
	if (!this) return this;
	else return Math.round(this - (.35 * 127));
}

data.darkest = function() {
	if (!this) return this;
	else return Math.round(this - (.5 * 127));
}

data.shader = function(keyword) {
	// console.log('Shader this reference: ' + this);
	var arr = this.map(function(each) {
		return data[keyword].call(each); // Call correct function by keyword on numeric value
	});
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
		// console.log(this.prefixes);
		for (var i = 0; i < this.prefixes.length; i ++) {
			var shade = this.shader.call(this.colors[color], this.prefixes[i]);//'normal'); // Eventually need to call all formulas
			var name = this.namer(this.prefixes[i], [color]);
			arr.push({ [name]: this.stringifyRGBA.call(shade) });
		}
	}
	console.log(arr);
	return arr;
	// this.rgbaColors[color] console.log(this.rgbaColors);
}



function genComponents() {

	var myArr = data.gen.call(data, 'normal');
	var sass = data.sass.call(myArr);
	var html = data.html.call(myArr);
	var uri = data.uri(sass);

	return {
		html, // Colors
		sass, // Raw Code
		uri   // Downloadable URI  
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