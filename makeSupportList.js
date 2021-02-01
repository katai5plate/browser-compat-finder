const bcd = require("@mdn/browser-compat-data");

module.exports = () =>
  Object.entries(bcd)
    .filter(([category]) => !["browsers"].includes(category))
    .reduce(
      (p, [category, data]) => [
        ...p,
        ...Object.entries(data).reduce(
          (p1, [name1, data1]) => [
            ...p1,
            ...(data1.__compat
              ? [
                  console.log(`bcd["${category}"]["${name1}"]`) || {
                    path: [category, name1],
                    support: data1.__compat.support,
                  },
                ]
              : Object.entries(data1).reduce(
                  (p2, [name2, data2]) => [
                    ...p2,
                    ...(data2.__compat
                      ? [
                          console.log(
                            `bcd["${category}"]["${name1}"]["${name2}"]`
                          ) || {
                            path: [category, name1, name2],
                            support: data2.__compat.support,
                          },
                        ]
                      : Object.entries(data2).reduce(
                          (p3, [name3, data3]) => [
                            ...p3,
                            ...(data3.__compat
                              ? [
                                  console.log(
                                    `bcd["${category}"]["${name1}"]["${name2}"]["${name3}"]`
                                  ) || {
                                    path: [category, name1, name2, name3],
                                    support: data3.__compat.support,
                                  },
                                ]
                              : Object.entries(data3).reduce(
                                  (p4, [name4, data4]) => [
                                    ...p4,
                                    ...(data4.__compat
                                      ? [
                                          console.log(
                                            `bcd["${category}"]["${name1}"]["${name2}"]["${name3}"]["${name4}"]`
                                          ) || {
                                            path: [
                                              category,
                                              name1,
                                              name2,
                                              name3,
                                              name4,
                                            ],
                                            support: data4.__compat.support,
                                          },
                                        ]
                                      : Object.entries(data4).reduce(
                                          (p5, [name5, data5]) => [
                                            ...p5,
                                            ...[
                                              console.log(
                                                `bcd["${category}"]["${name1}"]["${name2}"]["${name3}"]["${name4}"]["${name5}"]`
                                              ) || {
                                                path: [
                                                  category,
                                                  name1,
                                                  name2,
                                                  name3,
                                                  name4,
                                                  name5,
                                                ],
                                                support: data5.__compat.support,
                                              },
                                            ],
                                          ],
                                          []
                                        )),
                                  ],
                                  []
                                )),
                          ],
                          []
                        )),
                  ],
                  []
                )),
          ],
          []
        ),
      ],
      []
    );
