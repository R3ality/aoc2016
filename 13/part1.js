'use strict';

let input = 1350;
//input = 10; //test input

let steps = 0;

let loc = { x:1, y:1 };
let dest = { x:31, y:39 };
//dest = { x:7, y:4 }; //test input

let dim = { x:dest.x+20, y:dest.y+20 };
let track = [];

//create the map array
let map = new Array(dim.y).fill('?');
map = map.map(() => { 
	return new Array(dim.x).fill('?');
}); //printMap();

//populate it with tiles
for (let y = 0; y < dim.y; y++) {
	for (let x = 0; x < dim.x; x++ ) {
		let num = x*x + 3*x + 2*x*y + y + y*y + input; //(x*x + 3*x + 2*x*y + y + y*y) + favorite number
		let bin = num.toString(2); //binary representation
		let count = (bin.match(new RegExp('1', 'g')) || []).length; //numer of "on" bits (1)
		if (count % 2 == 1) map[y][x] = '#';//odd = wall
		else map[y][x] = '.'; //even = open space
	}
}

function printMap() {
	//map.forEach((r, i) => { console.log(map[i].join(' ')); }); //simple print
	for (let y = 0; y < dim.y; y++) {
		let out = '';
		for (let x = 0; x < dim.x; x++ ) {
			if (y == dest.y && x == dest.x) out += 'x '; //where we need to go
			else if (y == loc.y && x == loc.x) out += 'o '; //where we are
			else out += map[y][x] +' ';
		}
		console.log(out);
	}
}

printMap();

function isWalkable(x, y) {
	if (y >= 0 && y < map.length) {
		if (x >= 0 && x < map[y].length) {
			return (map[y][x] != '#' && map[y][x] != 'E') ? true : false; //if not wall, then walkable
		}
	}
	return false;
}

/*
function goDown() {
	console.log('Trying to go down to '+ loc.x +','+ loc.y+1 +': '+ isWalkable(loc.x, loc.y+1));
	if (isWalkable(loc.x, loc.y+1)) {
		loc.y++;
		steps++;
		console.log('Took a step downwards, locaton now is: '+ JSON.stringify(loc));
		return true;
	}
	return false;
}
*/

function isDeadEnd(x, y) {
	let count = 0;
	if (!isWalkable(x, y-1)) count++; //cannot go up
	if (!isWalkable(x, y+1)) count++; //cannot go down
	if (!isWalkable(x-1, y)) count++; //cannot go left
	if (!isWalkable(x+1, y)) count++; //cannot go right
	return (count > 2) ? true : false; 
}

function removeAllDeadEnds() {
	while (true) {
		let count = 0;
		for (let y = 0; y < dim.y; y++) {
			for (let x = 0; x < dim.x; x++ ) {
				if (isWalkable(x, y) && isDeadEnd(x, y)) {
					map[y][x] = 'E';
					count++;
				}
			}
		}
		if (count == 0) break;
	}
}



/*
while (steps < 10) {
	/*
	if (loc[1] < dest[1]) { //need to go lower
		let x = loc[1];
		let y = loc[0];
		while (isWalkable(x, (y+1))) {
			moveTo(x, y+1);
		}
		while (isWalkable((x+1), y)) {
			moveTo(x+1, y);
		}
	}
	*/
	/*
	goDown()
	steps++;
}
*/
removeAllDeadEnds();
printMap();