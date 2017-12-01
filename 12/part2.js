'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
input = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`; //test dataset
*/

input = input.split(/\r\n|\n|\r/); //console.log(input);

let reg = { a: 0, b: 0, c: 0, d: 0 };
let instructions = [];

input.forEach((line, nr) => {
	let a = line.split(' ');
	let instr = { i: a[0], x: null, y: null, line: (nr+1) };
	instr.x = (isNaN(a[1])) ? a[1] : parseInt(a[1]);
	if (a.length == 3) instr.y = (isNaN(a[2])) ? a[2] : parseInt(a[2]);
	instructions.push(instr);
});

function runInstructions() {
	for (let i = 0; i < instructions.length; i++) {
		let instr = instructions[i];
		//console.log(i +'/'+ (instructions.length-1) +' --> Running instruction '+ JSON.stringify(instr));
		switch (instr.i) {
			case 'cpy':
				if (isNaN(instr.x) && instr.y) reg[instr.y] = reg[instr.x];
				else if (!isNaN(instr.x) && instr.y) reg[instr.y] = instr.x;
				else throw Error('Unhandled instruction: '+ JSON.stringify(instr));
				break;
			case 'inc':
				if (instr.x) reg[instr.x]++;
				else throw Error('Unhandled instruction: '+ JSON.stringify(instr));
				break;
			case 'dec':
				if (instr.x) reg[instr.x]--;
				else throw Error('Unhandled instruction: '+ JSON.stringify(instr));
				break;
			case 'jnz':
				if (!instr.y) throw Error('Unhandled instruction: '+ JSON.stringify(instr)); //if missing y
				let j = isNaN(instr.x) ? reg[instr.x] : instr.x; //if registry, fetch the value
				if (j != 0) { //if value is not 0
					if (i+instr.y > (instructions.length-1) || i+instr.y < 0) { //if jump is out of bounds, stop operation
						i = instructions.length; //console.log('..jump out of bounds, stopping operation');
					} else { //else take the jump
						i = (i+instr.y-1); //console.log('..jumping to instruction ID '+ (i+instr.y-1));
					}
				}
				//else console.log('..value is zero, skipping this jump');
				break; //else value was 0, skip instruction
		}
	}
}

runInstructions();
console.log('For part 1, registry "a" value is: '+ reg.a +' all registries are '+ JSON.stringify(reg));

reg = { a: 0, b: 0, c: 1, d: 0 };
runInstructions();
console.log('For part 2, registry "a" value is: '+ reg.a +' all registries are '+ JSON.stringify(reg));