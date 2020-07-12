const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const geoCode = require("./utiles/geocode");
const foreCast = require("./utiles/forecast");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geoCode(req.query.address, (err, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (err) {
      return res.send({
        err
      });
    }
    foreCast(latitude, longitude, (err, foreCastData) => {
      if (err) {
        return res.send({
          err
        });
      }
      res.send({
        forecast: foreCastData,
        location,
        address: req.query.address

      });

    });
  });
});



app.listen(process.env.PORT || 3000, () => {
  console.log("server started!");
});