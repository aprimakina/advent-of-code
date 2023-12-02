const { readData } = require("../utils/utilFunc");

const data = readData(__dirname);
const seeds = data[0].match(/seeds: (.+)/)[1].split(" ");
let lowestLocation = 0;

const mapLists = [];
let tempMapState = [];

// parsing input data
for (let i = 2; i < data.length; i++) {
  const str = data[i];
  if (str !== "" && !str.includes("map:")) {
    tempMapState.push(str.split(" "));
  } else if (str === "") {
    mapLists.push(tempMapState);
    tempMapState = [];
  }
}
mapLists.push(tempMapState);

// processing the maps
seeds.forEach((seed) => {
  // console.log("seed: " + seed);
  let res;

  mapLists.forEach((mapList, j) => {
    let rangeId = undefined;
    let mapInput = j === 0 ? seed : res;
    res = undefined;

    mapList.forEach((map, i) => {
      const sourceRange = Number(map[1]);
      const rangeLength = Number(map[2]);

      if (mapInput >= sourceRange && mapInput < sourceRange + rangeLength) {
        rangeId = i;
      }
    });

    if (rangeId === undefined) {
      res = mapInput;
    } else {
      {
        const sourceRange = Number(mapList[rangeId][1]);
        const destinationRange = Number(mapList[rangeId][0]);
        const diff = mapInput - sourceRange;
        res = destinationRange + diff;
      }
    }
  });

  if (!lowestLocation || res < lowestLocation) {
    lowestLocation = res;
  }
});

console.log(lowestLocation);
