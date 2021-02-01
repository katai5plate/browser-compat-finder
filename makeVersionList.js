const compare = require("semver-compare");
const { browsers } = require("@mdn/browser-compat-data");

module.exports = () =>
  Object.entries(browsers).reduce(
    (p, [browserName, versions]) => ({
      ...p,
      [browserName]: Object.keys(versions.releases).sort((a, b) =>
        compare(a, b)
      ),
    }),
    {}
  );
