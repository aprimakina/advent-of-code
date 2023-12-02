const { readData } = require("../utils/utilFunc");

const data = readData(__dirname);
const instructions = data[0].split("");

// { FSJ: [ 'GSQ', 'JNJ' ], ... }
const map = {};
for (let i = 2; i < data.length; i++) {
  const matches = data[i].match(/(.+)\= \((.+)\)/);
  map[matches[1].trim()] = matches[2].trim().split(", ");
}

const fromNodes = Object.keys(map).filter((m) => m.split("").includes("A"));
const toNodes = Object.keys(map).filter((m) => m.split("").includes("Z"));

const getStepsNum = (arr) => {
  const res = [];

  arr.forEach((from) => {
    let to = from;
    let steps = 0;
    let i = 0; // instructionsIndex

    while (true) {
      if (toNodes.includes(to) && steps !== 0) {
        break;
      }
      to = map[to][instructions[i] === "R" ? 1 : 0];
      i = i < instructions.length - 1 ? i + 1 : 0;
      steps++;
    }
    res.push({ from, to, steps });
  });
  return res;
};

// least common multiplier
const lcm = (arr) => {
  // greatest common divisor
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

const nums = getStepsNum(fromNodes).map((i) => i.steps);
console.log("lcm: " + lcm(nums));
