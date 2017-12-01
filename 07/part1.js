'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
var input = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`; //test dataset
*/

/*
var input = `wysextplwqpvipxdv[srzvtwbfzqtspxnethm]syqbzgtboxxzpwr[kljvjjkjyojzrstfgrw]obdhcczonzvbfby[svotajtpttohxsh]cooktbyumlpxostt
emzopymywhhxulxuctj[dwwvkzhoigmbmnf]nxgbgfwqvrypqxppyq[qozsihnhpztcrpbdc]rnhnakmrdcowatw[rhvchmzmyfxlolwe]uysecbspabtauvmixa
bqooxxweoytjghrqn[hkwwukixothfyglw]kpasnmikmbzcbfi[vlnyszifsaaicagxtqf]ucdyxasusefuuxlx
rxpusykufgqujfe[rypwoorxdemxffui]cvvcufcqmxoxcphp[witynplrfvquduiot]vcysdcsowcxhphp[gctucefriclxaonpwe]jdprpdvpeumrhokrcjt`; //test dataset
*/

var digested = input.split(/\r\n|\n|\r/); //console.log(digested);

var validCount = 0;

digested.forEach(function(e) {
	var valid = 0;

	/*
	var pattern = /\[(.*?)\]/g;
	var matches = [];
	var match;
	while ((match = pattern.exec(e)) != null) {
		matches.push(match[1]);
	}
	*/

	console.log(e);

	var insideBrackets = [];
	var outsideBrackets = e.replace(/\[(.*?)\]/g, function(g0, g1) { //lets regex the brackets
		insideBrackets.push(g1); //push bracket content to array
		return '-'; //replace brackets with something we can easily split by
	}).split('-'); //split non-bracket text to an array

	/*
	console.log(e);
	console.log(outsideBrackets);
	console.log(insideBrackets);
	*/

	outsideBrackets.forEach(function(seq) {
		for (var i = 0; i < seq.length; i++) {
			var subs = seq.substring(i, i+4);
			if (subs.length == 4) { //if subsegment is 4 chars
				if (subs[0] == subs[3] && subs[1] == subs[2] && subs[0] != subs[1]) { //outside chars equal, inside chars equal, outside char not equal with inside char
					console.log(subs +'<-- is what we WANT outside of brackets, breaking');
					valid = 1;
					break;
				} //console.log('ab != ba');
			} //console.log('len < 4');
		}

	});

	insideBrackets.forEach(function(seq) {
		for (var i = 0; i < seq.length; i++) {
			var subs = seq.substring(i, i+4);
			if (subs.length == 4) { //if subsegment is 4 chars
				if (subs[0] == subs[3] && subs[1] == subs[2] && subs[0] != subs[1]) { //outside chars equal, inside chars equal, outside char not equal with inside char
					console.log(subs +'<-- is what we DONT want in brackets, breaking');
					valid = 0;
					break;
				} //console.log('ab != ba');
			} //console.log('len < 4');
		}

	});

	console.log(valid);

	validCount+=valid;
});

console.log('Number of addresses which support transport-layer snooping: '+ validCount);