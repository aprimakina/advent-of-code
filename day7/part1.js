const { readData } = require("../utils/utilFunc");

const cardStrength = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const ranksArr = [];
let winnings = 0;

readData(__dirname).forEach((str) => {
  const [hand, bid] = str.split(" ");
  const cardMap = {};
  hand.split("").forEach((c) => {
    if (!cardMap[c]) {
      cardMap[c] = 1;
    } else {
      cardMap[c]++;
    }
  });
  const cardNums = Object.values(cardMap);
  const maxOfKind = Math.max(...cardNums);
  const twoSameCardsCount = cardNums.filter((num) => num === 2).length;

  let weight;
  if (maxOfKind === 5) {
    weight = 7;
  } else if (maxOfKind === 4) {
    weight = 6;
  } else if (maxOfKind === 3 && twoSameCardsCount) {
    weight = 5;
  } else if (maxOfKind === 3) {
    weight = 4;
  } else if (maxOfKind === 2 && twoSameCardsCount === 2) {
    weight = 3;
  } else if (maxOfKind === 2) {
    weight = 2;
  } else {
    weight = 1;
  }
  ranksArr.push({ hand, bid, weight });
});

const getCardStrength = (card) => cardStrength[card] || card;

ranksArr.sort((a, b) => {
  if (a.weight > b.weight) {
    return 1;
  }

  if (a.weight === b.weight) {
    const aStr = a.hand.split("");
    const bStr = b.hand.split("");

    for (let i = 0; i < aStr.length; i++) {
      if (getCardStrength(aStr[i]) > getCardStrength(bStr[i])) {
        return 1;
      }

      if (getCardStrength(aStr[i]) < getCardStrength(bStr[i])) {
        return -1;
      }
    }
  }
  return -1;
});

ranksArr.forEach((t, j) => (winnings += Number(t.bid) * (j + 1)));
console.log(winnings);
