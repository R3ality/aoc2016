'use strict';

var crypto = require('crypto');

var input = 'ffykfhsq';
//var input = 'abc'; //test
var passw = new Array(8);

//for test cases, known indexes 5017308 (invalid due to position) & 5357525 (valid, digit "e" position 4)
//for (var i = 5017300; i < 5357529; i++) { 

for (var i = 0; i <= Number.MAX_SAFE_INTEGER; i++) {
	var hash = crypto.createHash('md5').update(input+i).digest("hex"); //generate the hash
	if (hash.substring(0,5) == '00000') { //if hash meets our requirement (starting with "00000")
		console.log('Suitable hash found at index '+ i +', md5('+ input+i +') = '+ hash);
		var pos = parseInt(hash.substring(5,6));
		if (pos >= 0 && pos < 8) { //if position is valid (8 digits so digit index needs to be 0-7)
			var dig = hash.substring(6,7);
			if (typeof passw[pos] === 'undefined') { //if we don't yet know the digit for this position
				passw[pos] = dig;
				console.log('..recorded password digit "'+ dig +'" for position "'+ pos +'"!');
			}
			else console.log('..but we already have a password digit for position '+ pos);
			
		}
		else console.log('..but indicated position "'+ pos +'" is not a number in range 0-7');
		//console.log(passw); //lets look at the digits getting into place
	}
	if (passw.join('').length == 8) { break; } //when we meet our password length requirement, let's stop looping
}

console.log('The password is: '+ passw.join(''));