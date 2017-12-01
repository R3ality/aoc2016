'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`; //test dataset, push button at time=5
*/

/*
input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.
Disc #5 has 7 positions; at time=0, it is at position 2.`; //test dataset, push button at time=65
*/

input = input.split(/\r\n|\n|\r/); //console.log(input);
input.push('Disc #X has 11 positions; at time=0, it is at position 0.'); //part 2

let disks = [];

input.forEach((str, id) => {
	let disk = str.split(' ');
	let totalPos = parseInt(disk[3]);
	let startPos = parseInt(disk[11].substr(0,2));
	disks.push([totalPos, startPos]);
});

function diskAtTime(d, t) { //d = disk, t = time
	let full = d[0]; //total number of positions
	let now = d[1] + t; //starting position + time 
	while (now >= full) now -= full; //reduce by full revelation until in range of a single turn
	return (now == full) ? 0 : now; //return position
}

function checkDisks() {
	for (let i = 0; i < disks.length; i++) { //loop disks
		if (diskAtTime(disks[i], time+i) != 0) return false; //if any disk is not aligned, stop
		//console.log('At time='+time +' the position for disk '+ i +' is suitable!')
	}
	return true; //otherwise all disks aligned
}

let time = 0;
let run = true;
let timeInterval = null;
let diskToSkip = disks.length-1;

while (run) {
	if (diskToSkip >= 0 && diskAtTime(disks[diskToSkip], time+diskToSkip) == 0) { //if we still have disks to include in time skipping and next one is aligned
		timeInterval = (timeInterval == null) ? disks[diskToSkip][0] : timeInterval * disks[diskToSkip][0]; //set new time skip interval
		console.log('Time '+ time +' is suitable for disk #'+ diskToSkip +' changed time skip interval to '+ timeInterval +', next time will be '+ (time+timeInterval));
		diskToSkip--;
	}	

	if (checkDisks()) {
		console.log('All disks (for part 2) will align if you press the button at time='+ (time-1));
		run = false;
	}

	if (timeInterval) { //if we have a known suitable time skip interval
		time = time+timeInterval; //apply it
	}
	else time++; //otherwise increment normally
}