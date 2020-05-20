const express = require("express");

const request = require("request");
const cheerio = require("cheerio");

const Coupon = require("../models/coupon");

const router = express.Router();

router.get("/api/getCourses/:id", (req, res, next) => {
  let url = "";
  if (req.params.id == 1) {
    url = "https://www.discudemy.com/all";
  } else {
    url = "https://www.discudemy.com/all/" + req.params.id;
  }
  let data = [];

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      try {
        const $ = cheerio.load(html);
        $(".card").each((i, el) => {
          const coupon = new Coupon();

          //day
          let day = $(el).find(".category div").text();
          if (day.length == 5) {
            day += ".";
          } else if (day.length == 9) {
            day += ".";
          }
          coupon.day = day;

          //Language
          const lang = $(el).find(".disc-fee").text();
          coupon.language = lang;

          //Heading of Course
          const heading = $(el).find(".card-header").text();
          coupon.heading = heading;

          //Category
          const category = $(el).find(".catSpan").text();
          coupon.category = category;

          //Link to Detail
          let linkDetail = $(el).find(".card-header").attr("href");
          coupon.linkToDetail = linkDetail;

          //Link to Coupon
          let link = $(el).find(".card-header").attr("href");
          link += "";
          link = link.split("/");
          coupon.linkToCoupon = link[4];

          //Url Category
          coupon.categoryInUrl = link[3];

          //Image Url
          const imgUrl = $(el).find("amp-img").attr("src");
          coupon.imageUrl = imgUrl;

          //Description
          const desc = $(el).find(".description").text().replace(/\s\s+/g, "");
          coupon.description = desc;
		  if(day != "") {
			data.push(coupon);
		  }
	      
        });
      } catch (e) {
        console.log("error");
        res.status(404).json({ message: "Not Found." });
      }
    }
  });
  let interval = setInterval(() => {
    if (data.length > 0) {
      res.status(200).json({
        message: "Data fetched Successfully",
        data: data,
      });
      clearInterval(interval);
    }
  }, 500);
});

router.get("/api/getCoupon/:id", (req, res, next) => {
  const url = "https://www.discudemy.com/go/" + req.params.id;
  let link = [];
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      link = $(".container .attached .segment a").attr("href");
    }
  });
  let interval = setInterval(() => {
    if (link.length > 0) {
      res.status(200).json({
        message: "Get Code Successfully",
        link: link,
      });
      clearInterval(interval);
    }
  }, 500);
});

module.exports = router;
