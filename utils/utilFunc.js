const path = require("path");
const fs = require("fs");

const readData = (dir) => {
  return fs
    .readFileSync(path.join(dir, "input.txt"), "utf-8")
    .toString()
    .trim()
    .split("\n");
};

module.exports = {
  readData,
};
