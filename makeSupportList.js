const bcd = require("@mdn/browser-compat-data");

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
        // console.log(path.join("/"));
        result = [
          ...result,
          {
            path,
            supports: browserList.reduce(
              (p, c) => ({
                ...p,
                [c]: Array.isArray(support[c]) ? support[c] : [support[c]],
              }),
              {}
            ),
          },
        ];
      }
    }
  };
  find(dataList);
  // console.log(Object.keys(browsers));
  return result;
};
