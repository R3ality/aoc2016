'use strict';

//https://en.wikipedia.org/wiki/Triangle_inequality

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString(); //var input = require('./aoc3-1.txt');

var digested = input.split('\r\n').map(function(s) {
	//console.log(s.trim().split(/\ +/));
	return s.trim().split(/\ +/).map(Number); //removing leading whitespaces, splitting at all other, mapping to Numbers
}); //console.log(digested);
var impossible = 0;

digested.forEach(function(x) {
	if (x[0] + x[1] > x[2] && x[1] + x[2] > x[0] && x[2] + x[0] > x[1]) console.log('Side lenghts '+ x +' appear to describe a valid triangle!');
	else {
		impossible++;
		console.log('Side lenghts '+ x +' are invalid for a triangle. Incrementing count..');
	}
});

console.log('Finished checking '+ digested.length +' descriptions. In total '+ (digested.length-impossible) +' were valid and '+ impossible +' were invalid');
