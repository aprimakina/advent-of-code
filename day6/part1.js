const { readData } = require("../utils/utilFunc");

const data = readData(__dirname);

const parseStr = (str) =>
  str
    .match(/(.+): (.+)/)[2]
    .trim()
    .split(" ")
    .filter((v) => v !== "");

const time = parseStr(data[0]);
const distance = parseStr(data[1]);

const wins = [];
time.forEach((t, i) => {
  let totalDistance = 0;
  let winsCount = 0;

  const d = distance[i];

  for (let j = 1; j < t; j++) {
    totalDistance = j * (t - j);
    if (totalDistance > d) {
      winsCount++;
    }
  }
  // console.log("wins: " + winsCount);
  wins.push(winsCount);
});

console.log(wins.reduce((a, b) => a * b));
