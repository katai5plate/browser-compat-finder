const bcd = require("@mdn/browser-compat-data");

(() => {
  const result = require("./makeSupportList")();
  require("fs").writeFileSync(
    "./supportList.json",
    JSON.stringify(result, null, 2)
  );
})();
