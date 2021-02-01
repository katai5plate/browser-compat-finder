const getResult = (
  { supportList, versionList, browserName, version },
  type
) => {
  const list = versionList[browserName];
  const versions = [true, ...list.slice(list.findIndex((x) => x === version))];
  const result = supportList
    .filter(({ supports }) =>
      versions.includes(supports[browserName][0].version_added)
    )
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
