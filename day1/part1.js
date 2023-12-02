const { readData } = require("../utils/utilFunc");

let sum = 0;
readData(__dirname).forEach((str) => {
  const digits = str.match(/\d/g);
  sum += Number(digits[0] + digits[digits.length - 1]);
});

console.log(sum);
