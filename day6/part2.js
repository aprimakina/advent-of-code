const { readData } = require("../utils/utilFunc");

const data = readData(__dirname);

const parseStr = (str) =>
  str
    .match(/(.+): (.+)/)[2]
    .trim()
    .replace(/ /g, "");

const t = parseStr(data[0]);
const d = parseStr(data[1]);

let totalDistance = 0;
let winsCount = 0;

for (let i = 1; i < t; i++) {
  totalDistance = i * (t - i);
  if (totalDistance > d) {
    winsCount++;
  }
}
console.log(winsCount);
