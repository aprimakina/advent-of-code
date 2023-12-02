const { readData } = require("../utils/utilFunc.js");

const availableColors = {
  red: 12,
  green: 13,
  blue: 14,
};

const regex = /:(.+)/;
let count = 0;
let skip = 0;

readData(__dirname).forEach((str, i) => {
  skip = 0;
  const gameNum = i + 1;

  const games = str.match(regex)[1];
  const sets = games.split(";");

  sets.some((set) => {
    const cubeSets = set.split(",");
    cubeSets.some((cubeSet) => {
      const iter = cubeSet.trim().split(" ");
      const maxAvailable = availableColors[iter[1]];

      if (maxAvailable < Number(iter[0])) {
        skip = 1;
        return true;
      }
    });
    return skip === 1;
  });

  if (skip !== 1) {
    count += gameNum;
  }
});

console.log(count);
