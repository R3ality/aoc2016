'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
//test dataset for part 1
var input = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`; //test dataset
*/

/*
//test dataset for part 2
var input = `aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`; //test dataset
*/

/*
//subset of actual input data. 1-2 are valid for test 1, 3-4 valid for test 2, 5-6 invalid for either
var input = `ybllxqqxzjlhskqi[ytsvahdhxgwnwql]pzfzcnbxiypkpytv
ufrkrtywkhfhfah[vufpfwhtxzbdqnraz]kklboeggazttzui
kjvalulqegxybfhx[djfulullrbsebeknl]bcxpgathyauumxcrsmk
amvudustnspjqsbpjp[wdudhbvvlgzbbbwlafg]kwpyjvuerzyzmzft
uowwwiqusrqkpamdm[cppbcnmcxpecyoey]ndmdrcadjoukusxjfl
xpjwxwgiyzqfwajto[msisxrvzebbtxiv]zkuujbuznilsymuuxq`; //test dataset
*/

var digested = input.split(/\r\n|\n|\r/); //console.log(digested);
var validCounts = [0, 0]; //first value fot TLS check (part 1), second for SSL check (part 2)

digested.forEach(function(e) {
	//console.log('Working with: '+ e);

	var insideBrackets = [];
	var outsideBrackets = e.replace(/\[(.*?)\]/g, function(g0, g1) { //lets regex the brackets
		insideBrackets.push(g1); //push bracket sequences to one array
		return '-'; //replace brackets with something we can easily split by
	}).split('-'); //split non-bracket sequences to second array

	//== PART 1 ==============================================================
	var valid = 0;
	outsideBrackets.forEach(function(seq) { //looping sequences which were outside brackets
		for (var i = 0; i < seq.length; i++) { //keep shifting focus forward char by char
			var subs = seq.substring(i, i+4);
			if (subs.length == 4) { //we're only interested in 4-char substrings
				if (subs[0] == subs[3] && subs[1] == subs[2] && subs[0] != subs[1]) { //if matches ABBA rules
					console.log('Found "'+ subs +'" outside of brackets, looks legit so far..');
					valid = 1;
					break;
				}
			}
		}
	});

	if (valid == 1) { //if it looked valid above, keep checking. otherwise skip
			insideBrackets.forEach(function(seq) { //looping sequences which were inside brackets
			for (var i = 0; i < seq.length; i++) { //keep shifting focus forward char by char
				var subs = seq.substring(i, i+4);
				if (subs.length == 4 && valid == 1) { //we're only interested in 4-char substrings. and maybe previous loop already disregarded it
					if (subs[0] == subs[3] && subs[1] == subs[2] && subs[0] != subs[1]) { //if matches ABBA rule
						console.log('..but unfortunately found "'+ subs +'" inside of brackets, disregard..');
						valid = 0;
						break;
					}
				}
			}
		});
	}

	validCounts[0] += valid;

	//== PART 2 ==============================================================
	valid = 0;
	outsideBrackets.forEach(function(seq) { //looping sequences which were outside brackets
		for (var i = 0; i < seq.length; i++) { //keep shifting focus forward char by char
			var subs = seq.substring(i, i+3);
			if (subs.length == 3 && valid == 0) { //we're only interested in 3-char substrings. and maybe previous loop already validated it
				if (subs[0] == subs[2] && subs[0] != subs[1]) { //if matches ABA rule
					var comp = subs[1]+subs[0]+subs[1]; //construct BAB
					insideBrackets.some(function(str) {
						if (str.indexOf(comp) !== -1) { //if we don't find BAB
							console.log('Found "'+ subs +'" outside brackets and matching "'+ comp +'" inside brackets. Fits our criteria!');
							valid = 1;
							return true;
						}
						else return false;
					});
				}
			}
		}
	});
	validCounts[1] += valid;

});

console.log('Number of IPs which support TLS (transport-layer snooping): '+ validCounts[0]);
console.log('Number of IPs which support SSL (super-secret listening):   '+ validCounts[1]);