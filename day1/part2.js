const { readData } = require("../utils/utilFunc");

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const digitValues = {};
digits.forEach((d, i) => {
  digitValues[d] = i + 1;
});

const wordDigits = digits.join("|");
const regex = new RegExp(`(\\d|${wordDigits})`, "g");

let sum = 0;

const wordToNumber = (val) => {
  if (val.length === 1) {
    return val;
  }
  return digitValues[val].toString();
};

readData(__dirname).forEach((str) => {
  const digitMatches = [];
  let next = regex.exec(str);
  while (next) {
    digitMatches.push(next[0]);
    regex.lastIndex = next.index + 1;
    next = regex.exec(str);
  }

  sum += Number(
    wordToNumber(digitMatches[0]) +
      wordToNumber(digitMatches[digitMatches.length - 1])
  );
});

console.log(sum);
