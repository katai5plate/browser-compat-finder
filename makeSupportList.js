const bcd = require("@mdn/browser-compat-data");

module.exports = () => {
  const { browsers, ...dataList } = bcd;
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
        console.log(path.join("/"));
        result = [...result, { path, support: data.__compat.support }];
      }
    }
  };
  find(dataList);
  return result;
};
