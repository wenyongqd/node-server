let express = require("express");
let axios = require("axios");
let app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Content-Type", "*");
  next();
});

let options = {
  headers: {
    Cookie:
      "xq_a_token=4db837b914fc72624d814986f5b37e2a3d9e9944; xqat=4db837b914fc72624d814986f5b37e2a3d9e9944; xq_r_token=2d6d6cc8e57501dfe571d2881cabc6a5f2542bf8; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYwMDQ4MzAwNywiY3RtIjoxNTk4NzM0Njk2MjIyLCJjaWQiOiJkOWQwbjRBWnVwIn0.YmVyy0uxYj1ekXeA1CoQ6zvg1nwqDjwUwXks3MDcmNyUO0OQpK9hx9dcHJ4ByvydBkFLoEX0hSixK16GavTyai01uqZB7uQp3i4U4a-82dghxOjlFspeYzOgkOt4xutNazeY1rYWHCfF4gKudz_zD8AD4il9q9LzIJFmpLsrFwXoop1e-e71mIBMyWMgWneSnQrAitOoweMUFBA1Kny6UBG_LVMKJrBzBxq6oSXat4PhfABnVevHYQXdXyVG0iifdOEtKX0vCa6YO-kOisxbCzHOOn8djb9Ev6RK0d7JcpQOnqsAre-IGuhr3hOqvrq3i0MMOL0nYWaqA6aJOeTdIg; u=911598734755274; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1598734757; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1598738775",
  },
};

app.get("/", (req, res) => {
  res.send("apiserver");
});

app.get("/api/index", (req, res) => {
  res.json();
});
app.get("/api/index/quote", async (req, res) => {
  let httpUrl =
    "https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX";

  let result = await axios.get(httpUrl, options);
  res.json(result.data);
});

app.get("/api/index/hotStock", async (req, res) => {
  //10全球 12沪深 13港股 14美股
  console.log(req.query.index);
  let index = req.query.index ? req.query.index : 12;
  let httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`;
  let result = await axios.get(httpUrl, options);
  res.json(result.data);
});

app.get("/api/index/news", async (req, res) => {
  let category = req.query.category ? req.query.category : -1;
  let httpUrl = `https://xueqiu.com/statuses/hot/listV2.json?since_id=-1&max_id=${category}&size=15`;
  let result = await axios.get(httpUrl, options);
  res.json(result.data);
});
app.listen(3000, () => {
  console.log("server start:", "http://localhost:3000");
});
