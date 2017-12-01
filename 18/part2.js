'use strict';

let input = '^..^^.^^^..^^.^...^^^^^....^.^..^^^.^.^.^^...^.^.^.^.^^.....^.^^.^.^.^.^.^.^^..^^^^^...^.....^....^.';
let limit = 400000;

//input = '.^^.^.^^^^'; //test input
//limit = 10; //test input

let rows = [input];
let safe = 0;

while (limit > 1) { //while floor limit is not reached
	let row ='';
	for (let i = 0; i < input.length; i++) { //loop all characters
		let prow = rows[rows.length-1]; //use previous row for left, center, right
		let pre = (i == 0) ? '.' : prow[i-1]; //left (if out of range, assume ".")
		pre += prow[i]; //center
		pre += (i == prow.length-1) ? '.' : prow[i+1]; //right (if out of range, assume ".")
		//lets chek if 3 tiles of the previous floor indicate a trap or safe tile for this floor
		let tile = (pre == '^^.' || pre == '.^^' || pre == '^..' || pre == '..^') ? '^' : '.';
		row += tile; //console.log(pre +' => '+ tile +' --> '+ row);
	}
	rows.push(row);
	limit--; //reduce floor limit
}

rows.forEach(r => { //for each row
	safe += (r.match(new RegExp('[.]', 'g')) || []).length; //increment number of safe tiles
});

console.log('Number of safe tiles (part 2): '+ safe);