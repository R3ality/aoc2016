'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
var input = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`; //test dataset
*/

var str = process.hrtime(); //start time

var digested = input.split(/\r\n|\n|\r/); //console.log(digested);
var charCounts = new Array();
var result = '';

function sortComp(a, b) {
	if (a[1] === b[1]) return (a[0] < b[0]) ? -1 : 1; //if count is equal, sort alphabetically instead
	else return (a[1] < b[1]) ? 1 : -1; //otherwise sort descending
}

digested.forEach(function(e) {
	for (var i = 0; i < e.length; i++) {
		var found = -1;
		if (Array.isArray(charCounts[i])) { //if it's an array
			found = charCounts[i].filter(function(v) { //find the position of the character
				return v[0] === e[i];
			});
		}
		else charCounts[i] = new Array(); //if it is not an array, make it one

		if (found.length > 0) found[0][1] += 1; //char already in array, increase count
		else charCounts[i].push([e[i], 1]); //char not in array, add with count 1
	}
});

charCounts.forEach(function(e) {
	e.sort(sortComp);
	result += e[0][0];
});

console.log('Error-corrected version of the message is: '+ result);