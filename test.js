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

testcase("support に全ブラウザ名がある", () =>
  list.every(
    ({ support }) => Object.keys(support).join() === browserList.join()
  )
);
testcase("全 support に version_added がある", () =>
  list.every(({ support }) =>
    Object.values(support).every((s) =>
      s.filter(
        ({ version_added }) =>
          version_added === null ||
          version_added === false ||
          typeof version_added === "string"
      )
    )
  )
);
