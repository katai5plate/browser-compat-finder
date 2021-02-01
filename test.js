const { browsers } = require("@mdn/browser-compat-data");
const list = require("./supportList.json");

const browserList = Object.keys(browsers);

const testcase = (name, condFn) => {
  console.log("TEST: " + name);
  if (!condFn()) {
    console.log("==> FAILED...");
    process.exit();
  }
  console.log("==> SUCCESS!");
};

testcase("supports に全ブラウザ名がある", () =>
  list.every(
    ({ supports }) => Object.keys(supports).join() === browserList.join()
  )
);
testcase("全 supports に version_added がある", () =>
  list.every(({ supports }) =>
    Object.values(supports).every((s) =>
      s.filter(
        ({ version_added }) =>
          version_added === null ||
          version_added === false ||
          typeof version_added === "string"
      )
    )
  )
);
