'use strict';

var input = 'L3, R2, L5, R1, L1, L2, L2, R1, R5, R1, L1, L2, R2, R4, L4, L3, L3, R5, L1, R3, L5, L2, R4, L5, R4, R2, L2, L1, R1, L3, L3, R2, R1, L4, L1, L1, R4, R5, R1, L2, L1, R188, R4, L3, R54, L4, R4, R74, R2, L4, R185, R1, R3, R5, L2, L3, R1, L1, L3, R3, R2, L3, L4, R1, L3, L5, L2, R2, L1, R2, R1, L4, R5, R4, L5, L5, L4, R5, R4, L5, L3, R4, R1, L5, L4, L3, R5, L5, L2, L4, R4, R4, R2, L1, L3, L2, R5, R4, L5, R1, R2, R5, L2, R4, R5, L2, L3, R3, L4, R3, L2, R1, R4, L5, R1, L5, L3, R4, L2, L2, L5, L5, R5, R2, L5, R1, L3, L2, L2, R3, L3, L4, R2, R3, L1, R2, L5, L3, R4, L4, R4, R3, L3, R1, L3, R5, L5, R1, R5, R3, L1';
//var input = 'R2, L3'; //5
//var input = 'R2, R2, R2'; //2
//var input = 'R5, L5, R5, R3'; //12
//var input = 'R8, R4, R4, R8'; //8; twice = 4

var direction = 0; //N=0, E=1, S=2, W=3
var pos = [0, 0];

var digested = input.split(', '); //console.log(digested);

var visitedCoords = new Array();
visitedCoords[pos] = 1;

var firstDuplicate = new Array();

function makeMoves() {
	digested.forEach(function(move) {
		var movedir = move.charAt(0); //console.log(movedir);
		var movedist = parseInt(move.substring(1)); //console.log(movedist);

		setDirection(movedir);
		setPosition(movedist);

		console.log('Finished move ' + move + ' and ended up facing ' + getDirection() + ' at ' + getPosition(pos) + '. I\'ve been here ' + visitedCoords[pos] + ' times.');
	});
}

function setDirection(dir) {
	dir = (dir == 'L') ? -1 : 1;
	//stay within our defined direction parameters
	if (dir == -1 && direction == 0) direction = 3;
	else if (dir == 1 && direction == 3) direction = 0;
	else direction += dir;
}

function setPosition(dist) {
	//I (+,+), II (−,+), III (−,−), and IV (+,−)
	//https://en.wikipedia.org/wiki/Quadrant_(plane_geometry)
	for (var i = 0; i < dist; i++) {
		switch (direction) {
			case 0:
				pos[1] += 1; //y+
				break;
			case 1:
				pos[0] += 1; //x+
				break;
			case 2:
				pos[1] -= 1; //y-
				break;
			case 3:
				pos[0] -= 1; //x-
				break;
		}

		if (visitedCoords[pos] !== undefined) { //if been there already
			console.log('Took a step to ' + getPosition(pos) + ' and apparently I\'ve been here ' + visitedCoords[pos] + ' times');
			if (firstDuplicate.length == 0) { //if first time been in same location
				firstDuplicate = pos.slice();
				console.log('By the way this looks like the first time I\'m at one location the second time. Set duplicate to ' + getPosition(firstDuplicate));
				//console.log(firstDuplicate[0] + ' and ' + firstDuplicate[1] + ' --> ' + getManhattanDistance(firstDuplicate));
			}
			visitedCoords[pos]++;
		}
		else {
			console.log('Took a step to ' + getPosition(pos) + ' and haven\'t been here before');
			visitedCoords[pos] = 1;
		}
	}
}

function getDirection() {
	var cardinals = [ 'N', 'E', 'S', 'W' ];
	return cardinals[direction];
}

function getPosition(coords) {
	return '(' + coords[0] + ', ' + coords[1] + ')';
}

function getManhattanDistance(newPos, oldPos) {
	oldPos = typeof oldPos !== 'undefined' ? oldPos : [0, 0];
	//int distance = Math.abs(x1-x0) + Math.abs(y1-y0);
	//http://stackoverflow.com/questions/8224470/calculating-manhattan-distance
	return Math.abs(newPos[0]-oldPos[0]) + Math.abs(newPos[1]-oldPos[1]);
}

makeMoves();
console.log('Manhattan distance between (0, 0) and ' + getPosition(pos) + ' = ' + getManhattanDistance(pos));
console.log('First location I visited twice was ' + getPosition(firstDuplicate) + ' which is ' + getManhattanDistance(firstDuplicate) + ' away')

//console.log(visitedCoords);
//console.log(firstDuplicate);
