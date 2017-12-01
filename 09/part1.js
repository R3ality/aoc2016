'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
//test input. expected result = console.log('ADVENTABBBBBCXYZXYZXYZABCBCDEFEFG(1x3)AX(3x3)ABC(3x3)ABCY');
input = 'ADVENT'+			 //contains no markers, decompresses to itself with no changes (len 6)
		'A(1x5)BC'+			 //repeats "B" 5 times, becoming "ABBBBBC" (len 7)
		'(3x3)XYZ'+			 //becomes "XYZXYZXYZ" (len of 9)
		'A(2x2)BCD(2x2)EFG'+ //doubles the "BC" and "EF", becoming "ABCBCDEFEFG" (len 11)
		'(6x1)(1x3)A'+		 //simply becomes "(1x3)A". second marker is ignored as its within the data of previous one (len 6)
		'X(8x2)(3x3)ABCY';	 //becomes "X(3x3)ABC(3x3)ABCY", because the decomp. data from (8x2) marker (the "(3x3)ABC") is skipped and not processed (len 18)
console.log(input);
*/

let pos = 0;
let res = '';
let re = /\((\d{1,4})x(\d{1,4})\)/g;
let marker;

while ((marker = re.exec(input)) !== null) {
	//console.log('Found "'+ marker[0] +'" at index '+ marker.index +', afterwards continuing from lastIndex '+ re.lastIndex);

	if (marker.index > pos) { //if there were leftovers which the previous marker didn't cover
		res += input.substr(pos, (marker.index-pos)); //add them as-is to the result
		//console.log('Carrying over "'+ input.substr(pos, marker.index) +'" as-is');
	}

	let len = parseInt(marker[1]); //length of repeated string
	let str = input.substr(re.lastIndex, len); //repeated string
	let times = parseInt(marker[2]); //how many times to repeat
	let repeat = new Array(times).fill(str).join(''); //construct the repeat string as per marker instructions
	//console.log('Repeating "'+ str +'" times '+ times +', incrementing result with "'+ repeat +'"');
	res += repeat; //add it to result

	//console.log('Pos was '+ pos +', setting to '+ re.lastIndex + len +'; lastIndex was '+ re.lastIndex +', setting to '+ re.lastIndex + len);
	pos = re.lastIndex + len; //keep track of index up to which we have completed decompression
	re.lastIndex += len; //for next match, skip whatever was still in range of current marker
	//console.log('--> '+ res);
}

if (pos < input.length) {
	//console.log('Incrementing result with leftover string "'+ input.substr(pos) +'"');
	res += input.substr(pos);
}
//console.log('--> '+ res);
//console.log('--> ADVENTABBBBBCXYZXYZXYZABCBCDEFEFG(1x3)AX(3x3)ABC(3x3)ABCY');

console.log('Length of decompressed (version 1) data is '+ res.length);