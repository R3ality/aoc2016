'use strict';

var fs = require('fs');
var path = require('path');
var input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString(); //synchronous read
input = input.split('\r\n'); //console.log(digested);

var pad = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ];
var keyPos = [1, 1]; //start at key 5
var solution = '';

console.log('Starting from key ' + getKey(keyPos) + ' (position ' + keyPos + ')');

function parseKey(line) {
	for (var i = 0; i < line.length; i++) {
		switch (line[i]) {
			case 'U':
				if (pad[keyPos[0]-1] !== undefined && pad[keyPos[0]-1][keyPos[1]] !== undefined) keyPos[0]-=1;
				else console.log('Invalid instruction, staying on the same key');
				break;
			case 'D':
				if (pad[keyPos[0]+1] !== undefined && pad[keyPos[0]+1][keyPos[1]] !== undefined) keyPos[0]+=1;
				else console.log('Invalid instruction, staying on the same key');
				break;
			case 'L':
				if (pad[keyPos[0]] !== undefined && pad[keyPos[0]][keyPos[1]-1] !== undefined) keyPos[1]-=1;
				else console.log('Invalid instruction, staying on the same key');
				break;
			case 'R':
				if (pad[keyPos[0]] !== undefined && pad[keyPos[0]][keyPos[1]+1] !== undefined) keyPos[1]+=1;
				else console.log('Invalid instruction, staying on the same key');
				break;
		}
		console.log('Took the step ' + line[i] + ' and am at key ' + getKey(keyPos) + ' (position ' + keyPos + ')');
	}
}

function getKey(position) {
	return pad[position[0]][position[1]];
}

input.forEach(function (line) {
	console.log('Solving line: ' + line);
	parseKey(line);
	console.log('Ended up at key ' + getKey(keyPos) + ' (position ' + keyPos + ')');
	solution+=getKey(keyPos);
});

console.log('Solution is ' + solution);
