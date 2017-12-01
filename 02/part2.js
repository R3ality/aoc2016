'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString(); //synchronous read
input = input.split('\r\n');

var pad = [
	[0, 0, 1, 0, 0],
	[0, 2, 3, 4, 0],
	[5, 6, 7, 8, 9],
	[0, 'A', 'B', 'C', 0],
	[0, 0, 'D', 0, 0]
];

var keyPos = [2, 0]; //start at key 5
var solution = '';

console.log('Starting from key ' + getKey(keyPos) + ' (position ' + keyPos + ')');

function parseDigit(instr) {
	for (var i = 0; i < instr.length; i++) {
		switch (instr[i]) {
			case 'U':
				if (pad[keyPos[0]-1] !== undefined && pad[keyPos[0]-1][keyPos[1]] !== undefined && pad[keyPos[0]-1][keyPos[1]] != 0) keyPos[0]-=1;
				//else console.log('Invalid instruction, staying on the same key');
				break;
			case 'D':
				if (pad[keyPos[0]+1] !== undefined && pad[keyPos[0]+1][keyPos[1]] !== undefined && pad[keyPos[0]+1][keyPos[1]] != 0) keyPos[0]+=1;
				//else console.log('Invalid instruction, staying on the same key');
				break;
			case 'L':
				if (pad[keyPos[0]] !== undefined && pad[keyPos[0]][keyPos[1]-1] !== undefined && pad[keyPos[0]][keyPos[1]-1] != 0) keyPos[1]-=1;
				//else console.log('Invalid instruction, staying on the same key');
				break;
			case 'R':
				if (pad[keyPos[0]] !== undefined && pad[keyPos[0]][keyPos[1]+1] !== undefined && pad[keyPos[0]][keyPos[1]+1] != 0) keyPos[1]+=1;
				//else console.log('Invalid instruction, staying on the same key');
				break;
		}
		console.log('Took the step ' + instr[i] + ' and am at key ' + getKey(keyPos) + ' (position ' + keyPos + ')');
	}
}

function getKey(position) {
	return pad[position[0]][position[1]];
}

input.forEach(function (line) {
	console.log('Solving next digit with instructions: ' + line);
	parseDigit(line);
	console.log('Ended up at key ' + getKey(keyPos) + ' (position ' + keyPos + ')');
	solution+=getKey(keyPos);
});

console.log('Solution is ' + solution);
