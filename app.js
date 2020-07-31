const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const couponRoutes = require("./routes/coupons");
const giveawayRoutes = require("./routes/giveaways");

const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


// app.get("/api/description/:id", (req, res, next) => {
//   let description = [];

//   const category = req.query.category;
//   const courseId = req.params.id;
//   const url = "https://www.discudemy.com/" + category + "/" + courseId;

//   request(url, (error, response, html) => {
//     if(!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       description = $(".stackable .thirteen .attached").text().replace(/\s\s+/g, "");
//     }
//   });
//   let interval = setInterval(() => {
//     if(description.length > 0) {
//       res.status(200).json({
//         message: 'Get Description Successfully',
//         description: description
//       });
//       clearInterval(interval);
//     }
//   }, 500)
// });

app.use("/api", couponRoutes);

app.use("/api", giveawayRoutes);

module.exports = app;
