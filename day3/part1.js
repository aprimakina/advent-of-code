const { readData } = require("../utils/utilFunc.js");

const data = readData(__dirname);
const digitRegex = new RegExp("\\d+", "g");

const isSymbol = (char) => {
  if (!char) {
    return false;
  }
  return char !== "." && !char.match(digitRegex);
};

let sum = 0;
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
      if (
        isSymbol(data[i - 1]?.[j]) ||
        isSymbol(data[i][j]) ||
        isSymbol(data[i + 1]?.[j])
      ) {
        sum += Number(value);
        break;
      }
    }
  });
});

console.log(sum);
