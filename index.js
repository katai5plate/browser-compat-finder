const supportList = require("./supportList.json");
const versionList = require("./versionList.json");

const getVersions = (browserName, version) => {
  const list = versionList[browserName];
  return [true, ...list.slice(list.findIndex((x) => x === version))];
};

const BROWSER_NAME = "safari_ios";
const BROWSER_VERSION = "12";

const versions = getVersions(BROWSER_NAME, BROWSER_VERSION);

supportList
  .filter(({ supports }) =>
    versions.includes(supports[BROWSER_NAME][0].version_added)
  )
  .forEach(({ path }) => console.log(path.join("/")));

console.log(versions);
