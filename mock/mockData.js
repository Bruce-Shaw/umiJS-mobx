import Mock from "mockjs";

const data = Mock.mock({
  getDataList: {
    message: "success",
    code: "success",
    success: true,
    data: {
      pageSize: 10,
      pageNow: 1,
      totalCount: 29,
      "pages|29": [
        {
          id: "@id",
          name: "@name",
          date: "@date",
        },
      ],
    },
  },
});

module.exports = {
  "GET /api/data/getDataList.json": (req, res) => {
    res.send(data.getDataList);
  },
};
