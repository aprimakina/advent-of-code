const { readData } = require("../utils/utilFunc");

let points = 0;
readData(__dirname).forEach((str, i) => {
  const card = str.match(/:(.+)/)[1];
  const parsedCard = card.match(/(.+)\|(.+)/);

  const winningNumbers = parsedCard[1].trim().split(" ");
  const numbers = parsedCard[2].trim().split(" ");

  const winningMap = {};
  winningNumbers.map((n) => (winningMap[n] = true));

  let count = 0;
  numbers.forEach((n) => {
    if (winningMap[n]) {
      count++;
    }
  });
  points += count === 0 ? 0 : Math.pow(2, count - 1);
});

console.log(points);
