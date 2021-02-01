const bcd = require("@mdn/browser-compat-data");
const compare = require("semver-compare");

module.exports = () => {
  const { browsers, ...dataList } = bcd;
  const browserList = Object.keys(browsers);
  const initSupport = browserList.reduce(
    (p, c) => ({ ...p, [c]: { version_added: null } }),
    {}
  );
  let result = [];
  const find = (objData, breadcrumb = []) => {
    for (let [name, data] of Object.entries(objData)) {
      if (!data.__compat) {
        if (breadcrumb.length !== 0) {
          find(data, [...breadcrumb, name]);
        } else {
          find(data, [name]);
        }
      } else {
        const path = [...breadcrumb, name];
        const support = { ...initSupport, ...data.__compat.support };
        const mdn = data.__compat.mdn_url;
        const forCompare = (versionString) => {
          let verstr = versionString;
          if (`${versionString}`.match(/^≤\d{1,}/))
            verstr = `${versionString}`.replace("≤", "");
          return [true, false, null].includes(verstr) ? "0.0.0" : verstr;
        };
        // console.log(path.join("/"));
        result = [
          ...result,
          {
            path,
            mdn,
            supports: browserList.reduce(
              (p, c) => ({
                ...p,
                [c]: Array.isArray(support[c])
                  ? support[
                      c
                    ].sort(({ version_added: a }, { version_added: b }) =>
                      compare(forCompare(b), forCompare(a))
                    )
                  : [support[c]],
              }),
              {}
            ),
          },
        ];
      }
    }
  };
  find(dataList);
  return result;
};
