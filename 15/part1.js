'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`; //test dataset
*/

input = input.split(/\r\n|\n|\r/); //console.log(input);

let disks = [];
let time = 0;
let run = true;

input.forEach((str, id) => {
	let disk = str.split(' ');
	let totalPos = parseInt(disk[3]);
	let startPos = parseInt(disk[11].substr(0,2));
	disks.push([totalPos, startPos]);
});

function diskAtTime(d, t) { //d = disk, t = time
	let total = d[0];
	let now = d[1] + t; //starting position + time 
	while (total % now == total) { //if position is further than a full revolution
		now = (now-total == total) ? 0 : now-total; //reduce by full revolution
	}
	return now; //return disk position at this specified time
}

function checkDisks() {
	let count = 0; //keep track of how many disks would align
	for (let i = 0; i < disks.length; i++) { //loop disks
		if (diskAtTime(disks[i], time+i) != 0) break; //if any disk is not aligned, stop loop
		else count++ //otherwise increase count
		//console.log('At time='+time +' the position for disk '+ i +' is suitable!')
	}
	if (count == disks.length) return true; //if all disks aligned
	else return false;
}

while (run) {
	if (checkDisks()) {
		console.log('All disks (for part 1) will align if you press the button at time='+ (time-1));
		run = false;
	}
	time++
}