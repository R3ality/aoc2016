'use strict';

let crypto = require('crypto');

let input = 'ahsbgdzn';
//input = 'abc'; //test input

let ind = 0; //index integer
let potKeys = []; //potential keys
let defKeys = []; //definite keys
let loopUntil = null; //fixed ceiling for loops

while (loopUntil == null || ind < loopUntil) { //loop until limit reached (if set)
	let hash = crypto.createHash('md5').update(input+ind).digest("hex");
	for (let i = 0; i < 2016; i++) hash = crypto.createHash('md5').update(hash).digest("hex"); //key stretching
	let match = null;
	if (match = hash.match(/(.)\1\1/)) { //if three matching chars in a row
		//console.log('Potential key '+ match.input +' (ind='+ ind +') having '+ match[0]);
		potKeys.push({ ind: ind, hash: match.input, rep: match[1], validated: false }); //add it to potential keys as unvalidated

		for (let i = 0; i < potKeys.length-1; i++) { //skip last key as we just added it now (hash cannot validate itself)
			let key = potKeys[i];
			if (!key.validated && ind-key.ind < 1000) { //if key is unvalidated and index is in range
				let quintuple = new Array(5).fill(key.rep).join('');
				if (hash.includes(quintuple)) { //if current hash validates that previous potential key
					console.log(key.hash +' (i='+ key.ind +') confirmed with '+ hash +' (i='+ ind +') having '+ quintuple);
					defKeys.push(key.ind); //keep the index of the valid key
					key.validated = true; //mark it as validated
					if (defKeys.length == 64) loopUntil = ind+1000; //target number of keys reached, set a loop limit for another 1000 hashes (in case validates earlier key)
				}
			}
		}
	}
	ind++;
}

defKeys.sort((a, b) => a-b); //sort the keys

console.log('64th key is produced (with key stretching) by index: '+ defKeys[63]);