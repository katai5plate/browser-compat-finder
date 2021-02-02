const getResult = ({
  supportList,
  versionList,
  browserName,
  version,
  isReverse,
  type,
}) => {
  const list = versionList[browserName];
  const versions = [
    true,
    ...list.slice(
      0,
      list.findIndex((x) => x === version)
    ),
  ];
  const result = supportList
    .filter(({ supports }) => {
      const cond = versions.includes(supports[browserName][0].version_added);
      return isReverse ? !cond : cond;
    })
    .map(({ path, supports, ...v }) => ({
      ...v,
      paths: path.join("/"),
      supports: supports[browserName],
    }));
  if (type === "html")
    return result.reduce(
      (p, { paths, mdn, supports }) =>
        `${p}<p><p><a href="${mdn}">${paths}</a></p>${supports
          .map(
            (support) =>
              `<p><pre>${JSON.stringify(support, null, 2).replace(
                /(^\{|\}$)/g,
                ""
              )}</pre></p>`
          )
          .join("")}</p>\n`,
      ""
    );
  if (type === "json") return JSON.stringify(result, null, 2);
  return result;
};

try {
  module.exports = getResult;
} catch (e) {
  // ブラウザの場合は定義のみ
}
