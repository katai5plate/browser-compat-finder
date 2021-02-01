(() => {
  const result = require("./makeSupportList")();
  require("fs").writeFileSync(
    "./supportList.json",
    JSON.stringify(result, null, 2)
  );
})();
