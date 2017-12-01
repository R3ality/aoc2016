'use strict';

function getStretchData(str, len) {
	while (str.length < len) { //while data is too short
		let ret = str.split('').reverse().map(x => { return (parseInt(x) == 0) ? 1 : 0; }).join(''); //apply modified dragon curve
		str += '0'+ ret; //lengthen data
	}
	return str.substr(0, len); //return only requested length
}

function getCheckSum(str) {
	while (str.length % 2 != 1) { //while str length is not odd
		let ret = '';
		for (let i = 0; i < str.length; i+=2) {
			ret += (str[i] == str[i+1]) ? 1 : 0; //compare character pairs and return appropriate value
		}
		str = ret; //replace string
	}
	return str; //after reducing to odd value, return result
}

let data = getStretchData('11011110011011101', 272);
console.log('Checksum for input data after stretching to required length (part 1) is: '+ getCheckSum(data));

data = getStretchData('11011110011011101', 35651584);
console.log('Checksum for input data after stretching to required length (part 2) is: '+ getCheckSum(data));