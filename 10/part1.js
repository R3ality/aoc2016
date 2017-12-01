'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

/*
input = `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`; //test dataset
*/

input = input.split(/\r\n|\n|\r/).sort(); //console.log(input); //sort the input so we get bot instructions first and values last

//let comp = [2, 5]; //for test data
let comp = [17, 61];
let bots = [];
let outp = [];
let res;

input.forEach(str => {
	let arr = str.split(' ');
	if (arr[0] == 'bot') {
		bots[arr[1]] = { holds: [],	inst: arr.slice(3) }; //initialize the bot with its instructions but no values
	}
	else if (arr[0] == 'value') {
		bots[arr[5]].holds.push(parseInt(arr[1])); //assign value to specified bot
	}
	else throw Error('Unexpected instruction: '+ arr[0]);
});

while (true) {
	let count = 0; //lets keep track of how many bots did not have 2 values

	bots.forEach((bot, num) => { //loop all bots
		if (bot.holds.length == 2) { //if bot holds 2 values
			bot.holds.sort(function(a, b) { return a - b; }); //sort held values
			//console.log('Bot '+ num +' is holding '+ bot.holds.join(' & ') +' and must give '+ bot.inst.join(' '));

			if (bot.holds.join() == comp.join()) res = num; //this is the droid we're looking for

			if (bot.inst[7] == 'bot') bots[bot.inst[8]].holds.push(bot.holds[1]); //give high value to specified bot
			else outp[bot.inst[8]] = bot.holds[1]; //give high value to specified output
			//console.log('..gave '+ bot.holds[1] +' (high) to '+ bot.inst[7] +' '+ bot.inst[8]);
			bot.holds.pop(); //remove high value from this bot

			if (bot.inst[2] == 'bot') bots[bot.inst[3]].holds.push(bot.holds[0]); //give low value to specified bot
			else outp[bot.inst[3]] = bot.holds[0]; //give low value to specified output
			//console.log('..gave '+ bot.holds[0] +' (low) to '+ bot.inst[2] +' '+ bot.inst[3]);
			bot.holds.pop(); //remove low value from this bot
		}
		else count++; //bot did not have 2 values, increment count
	});

	if (count == bots.length) break; //if none of the bots had 2 values, stop looping
}
debugger;
console.log('Bot that compared chips '+ comp.join(' & ') +' was: '+ res);
console.log('Multiplying chips in output bins 0, 1 and 2 results in: '+ outp[0]*outp[1]*outp[2]);