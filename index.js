const [_, __, browserName, version] = process.argv;
const supportList = require("./supportList.json");
const versionList = require("./versionList.json");
const getResult = require("./getResult");
const result = getResult({ supportList, versionList, browserName, version });
console.log(result[0].supports);
