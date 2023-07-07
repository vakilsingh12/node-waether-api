require('dotenv').config();
const express = require("express");
const app = express();
const weatherApi = (req, res) => {
  return new Promise((resolve, reject) => {
    fetch(process.env.WEATHER_URL)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
app.get("/", (req, res) => {
  weatherApi()
    .then((apiData) => {
      console.log(apiData);
      return res.status(200).json(apiData);
    })
    .catch((error) => {
      return res.status(500).json({ msg: "internal server error", error });
    });
});
app.listen(3002, () => {
  console.log("server  at port 3002");
});
