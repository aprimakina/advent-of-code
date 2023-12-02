const { readData } = require("../utils/utilFunc.js");

const data = readData(__dirname);
const digitRegex = new RegExp("\\d+", "g");

const starMap = {};
let sum = 0;

const findAdjacentStar = (char, starId, value) => {
  if (char === "*") {
    if (!starMap[starId]) {
      starMap[starId] = [];
    }
    starMap[starId].push(value);
  }
};

const getStarId = (i, j) => {
  return i + "&" + j;
};

data.forEach((str, i) => {
  const numbersInRow = [];

  while ((match = digitRegex.exec(str))) {
    numbersInRow.push({
      value: match,
      previousIndex: match.index - 1,
      nextIndex: digitRegex.lastIndex,
    });
  }

  numbersInRow.forEach((numberInRow) => {
    const { value, previousIndex, nextIndex } = numberInRow;
    for (let j = previousIndex; j <= nextIndex; j++) {
      findAdjacentStar(data[i - 1]?.[j], getStarId(i - 1, j), value);
      findAdjacentStar(data[i][j], getStarId(i, j), value);
      findAdjacentStar(data[i + 1]?.[j], getStarId(i + 1, j), value);
    }
  });
});

Object.values(starMap).forEach((parts) => {
  if (parts.length === 2) {
    sum += parts[0] * parts[1];
  }
});

console.log(sum);
