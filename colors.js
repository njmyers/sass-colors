// const fs = require('fs');
// import fs from 'fs';

const scale = 255;
const variety = 100; // 10 < variety < 245
const opacity = 1;

function darkening (divisor) {
	return function (args) {
		var str = '';
		for (var i = 0; i < args.length; i ++ ) {
			if (!args[i]) {
				str += args[i] + ', ';
				// console.log(args[i]);
			}
			else {
				str += (Math.round(args[i] / divisor)) + ', ';
				// console.log(Math.round(args[i] / divisor));
			}
		}
		str += opacity
		return str
	}
}

function lightening (divisor) {
	return function (args) {
		var str = '';
		for (var i = 0; i < args.length; i ++ ) {
			if (args[i] === 255) {
				str += args[i] + ', ';
				// console.log(args[i]);
			}
			else {
				str += (Math.round((args[i] + 127) / divisor)) + ', ';
				// console.log(Math.round((args[i] + 127) / divisor));
			}
		}
		str += opacity;
		return str;
	}
}

function normal(arr) {
	return function(arr) {
		var str = '';
		for (var i = 0; i < arr.length; i ++) {
			str += arr[i] + ', '
		}
		str += opacity
		return str
	}
}

var formulas = {
	lightest: lightening(1.3),
	lighter: lightening(1.5),
	light: lightening(2),
	normal: normal(),
	dark: darkening(1.3),
	darker: darkening(1.5),
	darkest: darkening(2)
}

var colors = {
	red: [255, 0, 0],
	magenta: [255, 0, 127],
	violet: [255, 0, 255],
	purple: [127, 0, 255],
	blue: [0, 0, 255],
	something: [0, 127, 255],
	cyan: [0, 255, 255],
	aqua: [0, 255, 127],
	green: [0, 255, 0],
	mustard: [127, 255, 0],
	yellow: [255, 255, 0],
	orange: [255, 127, 0]
}

var html = '';
var sass = '';

for (var color in colors) {
	for (var shade in formulas) {
		// var thisColor = formulas[shade].call(this, colors[color]);
		var thisColor = formulas[shade](colors[color]);
		console.log(thisColor);
		var colorName;
		// console.log(shade);
		(shade === 'normal') ? colorName = color : colorName = shade + '-' + color;
		html += `<div class="boxes" style="background: rgba(${thisColor})">This is ${colorName}</div>`;
		sass += `\$${colorName}: rgba(${thisColor})\n`
	}
}


document.getElementById('pallet').innerHTML = html;
document.getElementById('sass').innerHTML = '<code>' + sass + '</code>';

// console.log(formulas.dark([255, 0, 0]))


/*
Red (255, 0, 0, 1) //
Magenta (255, 0, 127, 1)
Violet (255, 0, 255, 1)
Purple(127, 0, 255, 1)
Blue (0, 0, 255, 1) // 
Something (0, 127, 255, 1)
Cyan (0, 255, 255, 1)
Aqua (0, 255, 127, 1)
Green (0, 255, 0, 1) // darkest (0, 100, 0) lightest (100, 255, 100)
Mustard (127, 255, 0, 1)
Yellow (255, 255, 0, 1) // darkest(127, 127, 0) lightest (255, 255, 127)
Orange (255, 127, 0, 1)

var primary = ['red', 'blue', 'green'];
var secondary = ['violet', 'cyan', 'yellow'];
var tertiary = ['magenta', 'purple', 'something', 'aqua', 'mustard', 'orange'];
*/