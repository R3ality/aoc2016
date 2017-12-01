'use strict';

var crypto = require('crypto');

var input = 'ffykfhsq';
//var input = 'abc';
var passw = new Array();

for (var i = 0; i < 9007199254740992; i++) {
	var hash = crypto.createHash('md5').update(input+i).digest("hex");
	if (hash.substring(0,5) == '00000') {
		passw.push(hash.substring(5,6));
		console.log('Suitable hash found at index '+ i +', md5('+ input+i +') = '+ hash +' (passw digit: '+ hash.substring(5,6) +')');
	}
	if (passw.length == 8) { break; } //when we meet our password requirement, let's stop looping
}

console.log('The password is: '+ passw.join(''));