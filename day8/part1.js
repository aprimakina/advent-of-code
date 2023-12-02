const { readData } = require("../utils/utilFunc");

const data = readData(__dirname);
const instructions = data[0].split("");

// { FSJ: [ 'GSQ', 'JNJ' ], ... }
const map = {};
for (let i = 2; i < data.length; i++) {
  const matches = data[i].match(/(.+)\= \((.+)\)/);
  map[matches[1].trim()] = matches[2].trim().split(", ");
}

let val = "AAA";
// instructionsIndex
let i = 0;
let steps = 0;
while (val !== "ZZZ") {
  val = map[val][instructions[i] === "R" ? 1 : 0];
  i = i < instructions.length - 1 ? i + 1 : 0;
  steps++;
}

console.log(steps);
