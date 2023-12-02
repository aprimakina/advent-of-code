const { readData } = require("../utils/utilFunc.js");

const regex = /:(.+)/;
let count = 0;

readData(__dirname).forEach((str, i) => {
  const games = str.match(regex)[1];
  const sets = games.split(";");

  const colorCount = {
    red: 0,
    green: 0,
    blue: 0,
  };

  sets.some((set) => {
    const cubeSets = set.split(",");
    cubeSets.some((cubeSet) => {
      const iter = cubeSet.trim().split(" ");
      colorCount[iter[1]] = Math.max(Number(iter[0]), colorCount[iter[1]]);
    });
  });

  count += Object.values(colorCount).reduce((a, b) => a * b);
});

console.log(count);
