const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/stock", cors(), async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const { ticker, type } = body;
  console.log("stocks-api.js 14 | body", body.ticker);
  const request = await fetch(
    `https://www.alphavantage.co/query?function=${timePeriod(
      type
    )}&symbol=${ticker}&apikey=${
      process.env.AIzaSyBqJnb17XCaWvNoxdTElPeeDNruFN5vg9o
    }`
  );
  const data = await request.json();
  res.json({ data: data });
});
