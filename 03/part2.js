'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString();

/*
var input = `    4   21  894
  419  794  987
  424  797  125
  651  305  558
  655  631  963
    2  628  436
  736   50  363
  657  707  408
  252  705   98`; //small subset of the input for testing
*/

var digested = input.split(/\r\n|\n|\r/).map(function(s) { //cover all splitting options to handle both file and test var input
	return s.trim().split(/\s+/).map(Number); //removing leading whitespaces, splitting at all other, mapping to Numbers
}); //console.log(digested);
var impossible = 0;

//https://en.wikipedia.org/wiki/Transpose
var transp = new Array();
var stack1 = new Array(); var stack2 = new Array(); var stack3 = new Array();
digested.forEach(function(x) {
	console.log('Working with '+ x +', pushing to stacks (length is '+ stack1.length +')');
	stack1.push(x[0]); stack2.push(x[1]); stack3.push(x[2]);

	if (stack1.length >= 3) {
		console.log('Threshold reached, returning '+ stack1 +' & '+ stack2 +' & '+ stack3 +' to main array and purging stacks');
		transp.push(stack1.slice(0, 3), stack2.slice(0, 3), stack3.slice(0, 3));
		stack1 = new Array(); stack2 = new Array(); stack3 = new Array();
	}
}); //console.log(transp);

//https://en.wikipedia.org/wiki/Triangle_inequality
transp.forEach(function(x) {
	if (x[0] + x[1] > x[2] && x[1] + x[2] > x[0] && x[2] + x[0] > x[1]) {
		console.log('Side lenghts '+ x +' appear to describe a valid triangle!');
	}
	else {
		impossible++;
		console.log('Side lenghts '+ x +' are invalid for a triangle. Incrementing count..');
	}
});

console.log('Finished checking '+ digested.length +' descriptions. In total '+ (digested.length-impossible) +' were valid and '+ impossible +' were invalid');
