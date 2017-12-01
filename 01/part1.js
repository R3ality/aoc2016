'use strict';

var input = 'L3, R2, L5, R1, L1, L2, L2, R1, R5, R1, L1, L2, R2, R4, L4, L3, L3, R5, L1, R3, L5, L2, R4, L5, R4, R2, L2, L1, R1, L3, L3, R2, R1, L4, L1, L1, R4, R5, R1, L2, L1, R188, R4, L3, R54, L4, R4, R74, R2, L4, R185, R1, R3, R5, L2, L3, R1, L1, L3, R3, R2, L3, L4, R1, L3, L5, L2, R2, L1, R2, R1, L4, R5, R4, L5, L5, L4, R5, R4, L5, L3, R4, R1, L5, L4, L3, R5, L5, L2, L4, R4, R4, R2, L1, L3, L2, R5, R4, L5, R1, R2, R5, L2, R4, R5, L2, L3, R3, L4, R3, L2, R1, R4, L5, R1, L5, L3, R4, L2, L2, L5, L5, R5, R2, L5, R1, L3, L2, L2, R3, L3, L4, R2, R3, L1, R2, L5, L3, R4, L4, R4, R3, L3, R1, L3, R5, L5, R1, R5, R3, L1';
//var input = 'R2, L3'; //5
//var input = 'R2, R2, R2'; //2
//var input = 'R5, L5, R5, R3'; //12

var direction = 0; //N=0, E=1, S=2, W=3
var pos = [0, 0];

var digested = input.split(', ');
console.log(digested);

//https://en.wikipedia.org/wiki/Taxicab_geometry

function makeMoves() {

	digested.forEach(function(move) {
		var movedir = move.charAt(0);
		//console.log(movedir);
		var movedist = parseInt(move.substring(1));
		//console.log(movedist);

		setDirection(movedir);
		setPosition(movedist);

		console.log('Made the move ' + move + ' and ended up facing ' + getDirection() + ' at coordinates ' + getPosition());
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
	switch (direction) {
		case 0:
			pos[1] += dist; //y+
			break;
		case 1:
			pos[0] += dist; //x+
			break;
		case 2:
			pos[1] -= dist; //y-
			break;
		case 3:
			pos[0] -= dist; //x-
			break;
	}
}

function getDirection() {
	var cardinals = [ 'N', 'E', 'S', 'W' ];
	return cardinals[direction];
}

function getPosition() {
	return '(' + pos[0] + ', ' + pos[1] + ')';
}

function getManhattanDistance() {
	//int distance = Math.abs(x1-x0) + Math.abs(y1-y0);
	//http://stackoverflow.com/questions/8224470/calculating-manhattan-distance
	return Math.abs(pos[0]-0) + Math.abs(pos[1]-0);
}

makeMoves();
console.log('Manhattan distance between (0, 0) and ' + getPosition() + ' = ' + getManhattanDistance());
