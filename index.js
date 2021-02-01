const { writeFileSync } = require("fs");
const supportList = require("./makeSupportList")();
const versionList = require("./makeVersionList")();
writeFileSync("./supportList.json", JSON.stringify(supportList, null, 2));
writeFileSync("./versionList.json", JSON.stringify(versionList, null, 2));
