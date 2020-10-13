const express = require("express");
const app = express();


const plenticore = require('./helpers/plenticore');

async function read() {
  return await plenticore.getData();
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Max-Age", "1000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  next();
});

app.listen(666, () => {
  console.log('>>> Get Data Stream')
  console.log("http://localhost:666/plenticore");
});

app.get("/plenticore", async (req, res, next) => {
  try {
    const data = await read().then(res => {return res})
    res.send(data)
  } catch {
    res.status(404)
    res.send({ error: "Error" })
  }
});
