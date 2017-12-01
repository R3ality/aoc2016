'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString();

/*
var input = `aczupnetwp-mfyyj-opalcexpye-977[peyac]
qzchnzbshud-cxd-trdq-sdrshmf-105[jqexn]`; //small subset of the input for testing
*/

var digested = input.split(/\r\n|\n|\r/); //console.log(digested);
var processed = new Array();
var sectsum = 0;

function sortComp(a, b) {
	if (a[1] === b[1]) return (a[0] < b[0]) ? -1 : 1; //if count is equal, sort alphabetically instead
	else return (a[1] < b[1]) ? 1 : -1; //otherwise sort descending
}

function getFiveChars(arr) {
	var ret = '';
	for (var i = 0; i < 5; i++) {
		ret += arr[i][0];
	}
	return ret;
}

//adapted from https://gist.github.com/EvanHahn/2587465
function caesarShift(ciphertext, cipher) {
	if (cipher < 0) return caesarShift(ciphertext, cipher + 26); //wrap in case of decyphering
	var ret = '';
	for (var i = 0; i < ciphertext.length; i++) {
		var c = ciphertext[i];
		if (c.match(/[a-z]/i)) { //if dealing with a letter
			var code = ciphertext.charCodeAt(i); //get character code
			//lowercase letters
			if ((code >= 65) && (code <= 90)) c = String.fromCharCode(((code - 65 + cipher) % 26) + 65);
			//uppercase letters
			else if ((code >= 97) && (code <= 122)) c = String.fromCharCode(((code - 97 + cipher) % 26) + 97);
		}
		ret += c;
	}
	return ret;
}

digested.forEach(function(e, i) {
	var room = { 'orig': e };

	room.csum = e.match(/\[(.*?)\]/)[1]; //extract the checksum
	e = e.substring(0, e.indexOf('[')); //remove the checksum part from original string
	e = e.split('-'); //split by dashes
	room.sect = parseInt(e[e.length-1]); //extract sector id
	e.pop(); //remove the sector id part
	room.name = e.join('-'); //reconstruct the name itself with no dashes

	var nameChars = new Array();
	for (var i = 0, len = e.join('').length; i < len; i++) {
		var found = nameChars.filter(function(v) {
			return v[0] === e.join('')[i];
		});

		if (found.length > 0) found[0][1] += 1;
		else nameChars.push([e.join('')[i], 1]);
	}

	nameChars.sort(sortComp);
	//room.chars = nameChars;
	room.rsum = getFiveChars(nameChars);
	room.real = (room.csum == room.rsum) ? true : false;

	processed.push(room); //console.log(room);
});

processed.forEach(function(e, i) {
	if (e.real) {
		sectsum += e.sect;
		e.decr = caesarShift(e.name, e.sect);
		//console.log(digested[i] +' --> '+ e.decr);
		if (e.decr.indexOf('pole') > -1) console.log('Sector ID for "'+ e.decr +'" is '+ e.sect);
	}
	//console.log(digested[i] +' --> '+ e.real);
});

//console.log(processed);
console.log('Sum of sector ID-s of real rooms is ' + sectsum);