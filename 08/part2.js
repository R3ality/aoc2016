'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
input = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`; //test dataset
*/

let digested = input.split(/\r\n|\n|\r/); //console.log(digested);
//let display = makeDisplay(7, 3); //console.log(display);
let display = makeDisplay(50, 6); //console.log(display);

function makeDisplay(x, y) {
	let ret = [];
	for (let i = 0; i < y; i++) { //loop y
		ret[i] = ''; //initialize the row
		for (let j = 0; j < x; j++) { //loop x
			ret[i] += '.'; //initialize all columns for this row
		}
	}
	return ret;
}

function drawDisplay() {
	console.log('\x1Bc'); //clear the screen
	display.forEach(row => console.log(row));
}

function rect(a, b) {
	let str = new Array(a+1).join('#'); //generate rectangle pixels columns
	for (let i = 0; i < b; i++) { //loop through rectable rows
		display[i] = str + display[i].substring(a); //set new pixels
	}
}

function rotateRow(index, count) {
	let row = display[index].split(''); //split the target row into an array
	for (let i = 0; i < count; i++) { //loop rotate count
		row.unshift(row.pop()); //move last element to first element
	}
	display[index] = row.join(''); //replace row
}

function rotateColumn(index, count) {
	let column = [];
	for (let i = 0; i < display.length; i++) { //loop display rows
		column.push(display[i][index]); //constuct array of the column elements
	}
	for (let i = 0; i < count; i++) { //loop rotate count
		column.unshift(column.pop()); //move last element to first element
	}
	for (let i = 0; i < column.length; i++) { //loop column rows
		display[i] = display[i].substring(0, index) + column[i] + display[i].substring(index+1); //replace original row with newly constructed one (where column is changed)
	}
}

function countLitPixels() {
	let count = 0;
	display.forEach(row => {
		count += (row.split('#').length-1);
	});
	return count;
}

drawDisplay();

digested.forEach(instr => {
	let rgx = null;

	if (rgx = (/rect\s(\d{1,2})x(\d{1,2})/g).exec(instr)) { //if "rect AxB"
		console.log('Got instruction to draw rect '+ rgx[1] +' by '+ rgx[2]);
		rect(parseInt(rgx[1]), parseInt(rgx[2]));
	}
	else if (rgx = (/rotate\s(column x=|row y=)(\d{1,2})\sby\s(\d{1,2})/g).exec(instr)) { //if "rotate row y=A by B" or "rotate column x=A by B"
		console.log('Got instruction to rotate "'+ rgx[1][0] +'" at '+ rgx[2] +' by '+ rgx[3]);
		if (rgx[1][0] == 'r') {
			rotateRow(parseInt(rgx[2]), parseInt(rgx[3]));
		}
		else if (rgx[1][0] == 'c') {
			rotateColumn(parseInt(rgx[2]), parseInt(rgx[3]));
		}
	}

	drawDisplay();
	//var waitTill = new Date(new Date().getTime() + 1 * 1000); //wait 1s
	var waitTill = new Date(new Date().getTime() + 100); //wait 300ms
	while(waitTill > new Date()){}
});

//drawDisplay();
console.log('This many pixels should be lit on the display: '+ countLitPixels());

