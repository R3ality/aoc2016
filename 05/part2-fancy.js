'use strict';

var crypto = require('crypto');

var input = 'ffykfhsq';
//var input = 'abc'; //test cases

var str = process.hrtime(); //start time
var passw = new Array(8);

cinematicDecryption();

//for test cases, known indexes 5017308 (invalid due to position) & 5357525 (valid, digit "e" position 4)
//for (var i = 5017300; i < 5357529; i++) { 
for (var i = 0; i <= Number.MAX_SAFE_INTEGER; i++) {
	var hash = crypto.createHash('md5').update(input+i).digest("hex"); //generate the hash
	if (hash.substring(0,5) == '00000') { //if hash meets our requirement (starting with "00000")
		//console.log('Suitable hash found at index '+ i +', md5('+ input+i +') = '+ hash);
		var pos = parseInt(hash[5]);
		if (pos >= 0 && pos < 8) { //if position is valid (8 digits so digit index needs to be 0-7)
			var dig = hash[6];
			if (typeof passw[pos] === 'undefined') { //if we don't yet know the digit for this position
				passw[pos] = dig;
				//console.log('..recorded password digit "'+ dig +'" for position "'+ pos +'"!');
				cinematicDecryption(); //uncomment this to just get the result without the "cinematic" output
			}
			//else console.log('..but we already have a password digit for position '+ pos);
		}
		//else console.log('..but indicated position "'+ pos +'" is not a number in range 0-7');
		//console.log(passw); //lets look at the digits getting into place
	}
	if (passw.join('').length == 8) { break; } //when we meet our password length requirement, let's stop looping
}

function cinematicDecryption() {
	var p = new Array();
	var f = '\x1b[33m', g = '\x1b[32m', r = '\x1b[31m', d = '\x1b[0m'; //f = foreground, g = green, r = red, d = default
	for (var i = 0; i < passw.length; i++) {
		if (typeof passw[i] === 'undefined') p.push(r+'█'+f);
		else p.push(g+passw[i]+f);
	}
	console.log('\x1Bc', 'Cracking the password, please wait...'); //The '\x1Bc' clears the screen
	console.log(f, '╔═════════════════════════╗', d);
	console.log(f, '║    CRACKING PASSWORD    ║', d);
	console.log(f, '╠═════════════════════════╣', d);
	console.log(f, '║     '+p.join(' ')+'     ║', d); //console.log('|     _ _ _ _ _ _ _ _     |');
	console.log(f, '╚═════════════════════════╝', d);
}

console.log('The password is: '+ passw.join(''));
var dur = process.hrtime(str);
console.log('Script took '+ (dur[0] + dur[1] / 1000000000.0) +'s to complete...');