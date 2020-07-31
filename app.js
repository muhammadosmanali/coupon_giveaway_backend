const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const couponRoutes = require("./routes/coupons");
const giveawayRoutes = require("./routes/giveaways");

const app = express();

var whitelist = ['http://localhost:4200', 'https://muhammadusmanali.codes/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));


app.use(bodyParser.json());





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
