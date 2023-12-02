const { readData } = require("../utils/utilFunc");

const data = readData(__dirname);
const cardMap = {};

data.forEach((_, i) => (cardMap[i] = 1));

data.forEach((str, i) => {
  const card = str.match(/:(.+)/)[1];
  const parsedCard = card.match(/(.+)\|(.+)/);

  const winningNumbers = parsedCard[1].trim().split(" ");
  const numbers = parsedCard[2].trim().split(" ");

  const winningMap = {};
  winningNumbers.map((n) => {
    if (n.length) {
      winningMap[n] = true;
    }
  });

  let count = 0;
  numbers.forEach((n) => {
    if (winningMap[n]) {
      count++;
    }
  });

  for (j = 1; j <= count; j++) {
    if (cardMap[i + j]) {
      cardMap[i + j] += cardMap[i];
    }
  }
});

const total = Object.values(cardMap).reduce((a, b) => a + b);

console.log(total);
