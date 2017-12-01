'use strict';

let input = '^..^^.^^^..^^.^...^^^^^....^.^..^^^.^.^.^^...^.^.^.^.^^.....^.^^.^.^.^.^.^.^^..^^^^^...^.....^....^.';
let limit = 40;

input = '.^^.^.^^^^'; //test input
limit = 10; //test input

let rows = [input];
let safe = 0;

while (limit > 1) {
	let row ='';
	for (let i = 0; i < rows[rows.length-1].length; i++) {
		let lef = (i == 0) ? '.' : rows[rows.length-1][i-1]; //left
		let cen = rows[rows.length-1][i]; //center
		let rig = (i == rows[rows.length-1].length-1) ? '.' : rows[rows.length-1][i+1]; //right
		let pre = lef+cen+rig;
		
		let tile = (pre == '^^.' || pre == '.^^' || pre == '^..' || pre == '..^') ? '^' : '.';
		row += tile; //console.log(pre +' => '+ tile +' --> '+ row);
	}
	rows.push(row);
	limit--;
}

rows.forEach(r => {
	safe += (r.match(new RegExp('[.]', 'g')) || []).length; //numer of safe tiles
});

let pad = new Array(rows.length.toString().length).fill('0').join('');
rows.forEach((r, i) => {
	let num = pad.substring(0, pad.length - i.toString().length) + i.toString();
	console.log(num +': '+ r);
});

console.log('Number of safe tiles (part 1): '+ safe);